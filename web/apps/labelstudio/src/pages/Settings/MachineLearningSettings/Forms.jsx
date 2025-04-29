import { useState } from "react";
import { Button } from "../../../components";
import { ErrorWrapper } from "../../../components/Error/Error";
import { InlineError } from "../../../components/Error/InlineError";
import { Form, Input, Select, TextArea, Toggle } from "../../../components/Form";
import "./MachineLearningSettings.scss";

const CustomBackendForm = ({ action, backend, project, onSubmit }) => {
  const [selectedAuthMethod, setAuthMethod] = useState("");
  const [, setMLError] = useState();

  return (
    <Form
      action={action}
      formData={{ ...(backend ?? {}) }}
      params={{ pk: backend?.id }}
      onSubmit={async (response) => {
        if (!response.error_message) {
          onSubmit(response);
        }
      }}
    >
      <Input type="hidden" name="项目" value={project.id} />

      <Form.Row columnCount={1}>
        <Input name="title" label="名称" placeholder="请输入名称" required />
      </Form.Row>

      <Form.Row columnCount={1}>
        <Input name="url" label="请输入URL" required />
      </Form.Row>

      <Form.Row columnCount={2}>
        <Select
          name="auth_method"
          label="选择身份验证方法"
          options={[
            { label: "不验证", value: "NONE" },
            { label: "基础验证", value: "BASIC_AUTH" },
          ]}
          onChange={(e) => {
            setAuthMethod(e.target.value);
          }}
        />
      </Form.Row>

      {(backend?.auth_method === "BASIC_AUTH" || selectedAuthMethod === "BASIC_AUTH") && (
        <Form.Row columnCount={2}>
          <Input name="basic_auth_user" label="Basic auth user" />
          {backend?.basic_auth_pass_is_set ? (
            <Input name="basic_auth_pass" label="Basic auth pass" type="password" placeholder="********" />
          ) : (
            <Input name="basic_auth_pass" label="Basic auth pass" type="password" />
          )}
        </Form.Row>
      )}

      <Form.Row columnCount={1}>
        <TextArea
          name="extra_params"
          label="模型连接期间要传递的任何额外参数"
          style={{ minHeight: 120 }}
        />
      </Form.Row>

      <Form.Row columnCount={1}>
        <Toggle
          name="is_interactive"
          label="交互式"
          description="如果启用，一些标签工具将在标注过程中以交互方式向ML后端发送请求。"
        />
      </Form.Row>

      <Form.Actions>
        <Button type="submit" look="primary" onClick={() => setMLError(null)}>
          验证并保存
        </Button>
      </Form.Actions>

      <Form.ResponseParser>
        {(response) => (
          <>
            {response.error_message && (
              <ErrorWrapper
                error={{
                  response: {
                    detail: `${backend ? "保存" : "新建"} ML后端失败。`,
                    exc_info: response.error_message,
                  },
                }}
              />
            )}
          </>
        )}
      </Form.ResponseParser>

      <InlineError />
    </Form>
  );
};

export { CustomBackendForm };
