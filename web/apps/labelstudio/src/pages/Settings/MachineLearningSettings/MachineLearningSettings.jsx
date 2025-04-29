import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Spinner } from "../../../components";
import { Description } from "../../../components/Description/Description";
import { Form, Label, Toggle } from "../../../components/Form";
import { modal } from "../../../components/Modal/Modal";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { IconModels } from "@humansignal/icons";
import { useAPI } from "../../../providers/ApiProvider";
import { ProjectContext } from "../../../providers/ProjectProvider";
import { MachineLearningList } from "./MachineLearningList";
import { CustomBackendForm } from "./Forms";
import { TestRequest } from "./TestRequest";
import { StartModelTraining } from "./StartModelTraining";
import { Block, Elem } from "../../../utils/bem";
import "./MachineLearningSettings.scss";

export const MachineLearningSettings = () => {
  const api = useAPI();
  const { project, fetchProject } = useContext(ProjectContext);
  const [backends, setBackends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchBackends = useCallback(async () => {
    setLoading(true);
    const models = await api.callApi("mlBackends", {
      params: {
        project: project.id,
        include_static: true,
      },
    });

    if (models) setBackends(models);
    setLoading(false);
    setLoaded(true);
  }, [project, setBackends]);

  const startTrainingModal = useCallback(
    (backend) => {
      const modalProps = {
        title: "开始模型训练",
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <StartModelTraining backend={backend} />,
      };

      modal(modalProps);
    },
    [project],
  );

  const showRequestModal = useCallback(
    (backend) => {
      const modalProps = {
        title: "Test Request",
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <TestRequest backend={backend} />,
      };

      modal(modalProps);
    },
    [project],
  );

  const showMLFormModal = useCallback(
    (backend) => {
      const action = backend ? "更新" : "新建";
      const modalProps = {
        title: `${backend ? "编辑" : "连接"} 模型`,
        style: { width: 760 },
        closeOnClickOutside: false,
        body: (
          <CustomBackendForm
            action={action}
            backend={backend}
            project={project}
            onSubmit={() => {
              fetchBackends();
              modalRef.close();
            }}
          />
        ),
      };

      const modalRef = modal(modalProps);
    },
    [project, fetchBackends],
  );

  useEffect(() => {
    if (project.id) {
      fetchBackends();
    }
  }, [project.id]);

  return (
    <Block name="ml-settings">
      <Elem name={"wrapper"}>
        {loading && <Spinner size={32} />}
        {loaded && backends.length === 0 && (
          <EmptyState
            icon={<IconModels />}
            title="连接你的第一个模型"
            description="连接机器学习模型以生成预测。这些预测可以并排比较，用于高效的预标记，并有助于主动学习，将用户引导到最有影响力的标记任务。"
            action={
              <Button primary onClick={() => showMLFormModal()}>
                连接模型
              </Button>
            }
            footer={
              <div>
                需要帮助？
                <br />
                <a href="https://labelstud.io/guide/ml" target="_blank" rel="noreferrer">
                文档中了解有关连接模型的更多信息
                </a>
              </div>
            }
          />
        )}
        <MachineLearningList
          onEdit={(backend) => showMLFormModal(backend)}
          onTestRequest={(backend) => showRequestModal(backend)}
          onStartTraining={(backend) => startTrainingModal(backend)}
          fetchBackends={fetchBackends}
          backends={backends}
        />

        {backends.length > 0 && (
          <>
            <Description>
            检测到连接的模型！如果你想从这个模型中获取预测，请按照以下步骤操作
              步骤:
              <br />
              <br />
              1. 导航到<i>数据管理</i>。<br />
              2. 选择所需的任务。
              <br />
              3. 在<i>行为</i> 菜单点击 <i>检索预测</i> 。
            </Description>
            <Description>
            如果您想使用模型预测进行预标记，请在{" "}
              <NavLink to="annotation">标签设置</NavLink>.
            </Description>
          </>
        )}

        <Form
          action="updateProject"
          formData={{ ...project }}
          params={{ pk: project.id }}
          onSubmit={() => fetchProject()}
        >
          {backends.length > 0 && (
            <Form.Row columnCount={1}>
              <Label text="Configuration" large />

              <div>
                <Toggle
                  label="在提交标注时开始模型训练"
                  description="此选项将向/train发送一个请求，其中包含有关标注的信息。您可以使用此功能启用主动学习循环。您还可以通过其卡片中的模型菜单手动开始训练。"
                  name="start_training_on_annotation_update"
                />
              </div>
            </Form.Row>
          )}

          {backends.length > 0 && (
            <Form.Actions>
              <Form.Indicator>
                <span case="success">已保存</span>
              </Form.Indicator>
              <Button type="submit" look="primary" style={{ width: 120 }}>
                保存
              </Button>
            </Form.Actions>
          )}
        </Form>
      </Elem>
    </Block>
  );
};

MachineLearningSettings.title = "模型";
MachineLearningSettings.path = "/ml";
