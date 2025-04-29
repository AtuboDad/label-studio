import { useCallback, useContext, useEffect, useState } from "react";
import { Description } from "../../../components/Description/Description";
import { Divider } from "../../../components/Divider/Divider";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { IconPredictions } from "@humansignal/ui";
import { useAPI } from "../../../providers/ApiProvider";
import { ProjectContext } from "../../../providers/ProjectProvider";
import { Spinner } from "../../../components/Spinner/Spinner";
import { PredictionsList } from "./PredictionsList";
import { Block, Elem } from "../../../utils/bem";
import "./PredictionsSettings.scss";

export const PredictionsSettings = () => {
  const api = useAPI();
  const { project } = useContext(ProjectContext);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchVersions = useCallback(async () => {
    setLoading(true);
    const versions = await api.callApi("projectModelVersions", {
      params: {
        pk: project.id,
        extended: true,
      },
    });

    if (versions) setVersions(versions.static);
    setLoading(false);
    setLoaded(true);
  }, [project, setVersions]);

  useEffect(() => {
    if (project.id) {
      fetchVersions();
    }
  }, [project]);

  return (
    <Block name="prediction-settings">
      <Elem name={"wrapper"}>
        {loading && <Spinner size={32} />}

        {loaded && versions.length > 0 && (
          <Elem name="title-block">
            <Elem name="title">预测列表</Elem>
            <Description style={{ marginTop: "1em" }}>
            项目中可用的预测列表。每张卡都与一个单独的型号版本相关联。为了学习如何导入预测，{" "}
              <a href="https://labelstud.io/guide/predictions.html" target="_blank" rel="noreferrer">
                查看&nbsp;这个&nbsp;文档
              </a>
              .
            </Description>
          </Elem>
        )}

        {loaded && versions.length === 0 && (
          <EmptyState
            icon={<IconPredictions />}
            title="尚未上传预测"
            description="预测可用于预标记数据或验证模型。您可以上传并从多个模型版本中选择预测。您还可以在“模型”选项卡中连接实时模型。"
            footer={
              <div>
                需要帮助？
                <br />
                <a href="https://labelstud.io/guide/predictions" target="_blank" rel="noreferrer">
                了解更多关于如何在我们的文档中上传预测的信息
                </a>
              </div>
            }
          />
        )}

        <PredictionsList project={project} versions={versions} fetchVersions={fetchVersions} />

        <Divider height={32} />
      </Elem>
    </Block>
  );
};

PredictionsSettings.title = "预测";
PredictionsSettings.path = "/predictions";
