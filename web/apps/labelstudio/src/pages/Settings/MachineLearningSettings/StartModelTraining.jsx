import { useCallback, useState } from "react";
import { Button } from "../../../components";
import { useAPI } from "../../../providers/ApiProvider";
import { Description } from "../../../components/Description/Description";
import { Block } from "../../../utils/bem";

export const StartModelTraining = ({ backend }) => {
  const api = useAPI();
  const [response, setResponse] = useState(null);

  const onStartTraining = useCallback(
    async (backend) => {
      const res = await api.callApi("trainMLBackend", {
        params: {
          pk: backend.id,
        },
      });

      setResponse(res.response || {});
    },
    [api],
  );

  return (
    <Block name="test-request">
      <Description style={{ marginTop: 0, maxWidth: 680 }}>
      您即将手动触发模型的训练过程。此操作将开始学习阶段关于如何在ML后端中实现训练方法。继续开始此过程。
        <br />
        <br />
        *注意：目前，此界面中没有内置的反馈循环来跟踪培训进度。您需要直接通过模型自己的工具和环境来监控模型的训练步骤。
      </Description>

      {response || (
        <Button
          onClick={() => {
            onStartTraining(backend);
          }}
        >
          开始训练
        </Button>
      )}

      {response && (
        <>
          <pre>请求已发送！</pre>
          <pre>返回: {JSON.stringify(response, null, 2)}</pre>
        </>
      )}
    </Block>
  );
};
