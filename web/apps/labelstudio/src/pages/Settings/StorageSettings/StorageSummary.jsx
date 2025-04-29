import { format } from "date-fns/esm";
import { Button } from "../../../components";
import { DescriptionList } from "../../../components/DescriptionList/DescriptionList";
import { Tooltip } from "@humansignal/ui";
import { modal } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { getLastTraceback } from "../../../utils/helpers";

export const StorageSummary = ({ target, storage, className, storageTypes = [] }) => {
  const storageStatus = storage.status.replace(/_/g, " ").replace(/(^\w)/, (match) => match.toUpperCase());
  const last_sync_count = storage.last_sync_count ? storage.last_sync_count : 0;

  const tasks_existed =
    typeof storage.meta?.tasks_existed !== "undefined" && storage.meta?.tasks_existed !== null
      ? storage.meta.tasks_existed
      : 0;
  const total_annotations =
    typeof storage.meta?.total_annotations !== "undefined" && storage.meta?.total_annotations !== null
      ? storage.meta.total_annotations
      : 0;

  // help text for tasks and annotations
  const tasks_added_help = `上次同步期间添加了${last_sync_count}个新任务。`;
  const tasks_total_help = `已找到并已同步的${tasks_existed} 个任务将不会再次添加到项目中。\n此存储总共添加了${ tasks_existed + last_sync_count } 个任务。`;
  const annotations_help = `上次同步期间成功保存了${last_sync_count}个标注。`;
  const total_annotations_help =
    typeof storage.meta?.total_annotations !== "未定义"
      ? `在同步时刻，项目中总共有${storage.meta.total_annotations}个标注。`
      : "";

  const handleButtonClick = () => {
    const msg =
      ` ${target === "导出" ? "导出错误日志 " : ""}${storage.type} ` +
      ` 项目 ${storage.project} 和任务 ${storage.last_sync_job} 存储编号 ${storage.id}:\n\n` +
      `${getLastTraceback(storage.traceback)}\n\n` +
      `元数据信息 = ${JSON.stringify(storage.meta)}\n`;

    modal({
      title: "存储错误日志",
      body: (
        <>
          <pre style={{ background: "#eee", borderRadius: 5, padding: 10 }}>{msg}</pre>
          <Button
            size="compact"
            onClick={() => {
              navigator.clipboard.writeText(msg);
            }}
          >
            Copy
          </Button>
          {target === "export" ? (
            <a
              style={{ float: "right" }}
              target="_blank"
              href="https://labelstud.io/guide/storage.html#Target-storage-permissions"
              rel="noreferrer"
            >
              Check Target Storage documentation
            </a>
          ) : (
            <a
              style={{ float: "right" }}
              target="_blank"
              href="https://labelstud.io/guide/storage.html#Source-storage-permissions"
              rel="noreferrer"
            >
              Check Source Storage documentation
            </a>
          )}
        </>
      ),
      style: { width: "700px" },
      optimize: false,
      allowClose: true,
    });
  };

  return (
    <div className={className}>
      <DescriptionList>
        <DescriptionList.Item term="Type">
          {(storageTypes ?? []).find((s) => s.name === storage.type)?.title ?? storage.type}
        </DescriptionList.Item>

        <Oneof value={storage.type}>
          <SummaryS3 case={["s3", "s3s"]} storage={storage} />
          <GSCStorage case="gcs" storage={storage} />
          <AzureStorage case="azure" storage={storage} />
          <RedisStorage case="redis" storage={storage} />
          <LocalStorage case="localfiles" storage={storage} />
        </Oneof>

        <DescriptionList.Item
          term="Status"
          help={[
            "已初始化：已添加存储，但从未同步；足以启动URI链接解析",
            "已排队：同步作业已在队列中，但尚未启动",
            "正在进行：同步作业正在运行",
            "失败：同步作业已停止，出现了一些错误",
            "已完成：同步作业已成功完成",
          ].join("\n")}
        >
          {storageStatus === "Failed" ? (
            <span style={{ cursor: "pointer", borderBottom: "1px dashed gray" }} onClick={handleButtonClick}>
              失败
            </span>
          ) : (
            storageStatus
          )}
        </DescriptionList.Item>

        {target === "export" ? (
          <DescriptionList.Item term="Annotations" help={`${annotations_help}\n${total_annotations_help}`}>
            <Tooltip title={annotations_help}>
              <span>{last_sync_count}</span>
            </Tooltip>
            <Tooltip title={total_annotations_help}>
              <span> ({total_annotations} total)</span>
            </Tooltip>
          </DescriptionList.Item>
        ) : (
          <DescriptionList.Item term="Tasks" help={`${tasks_added_help}\n${tasks_total_help}`}>
            <Tooltip title={`${tasks_added_help}\n${tasks_total_help}`} style={{ whiteSpace: "pre-wrap" }}>
              <span>{last_sync_count + tasks_existed}</span>
            </Tooltip>
            <Tooltip title={tasks_added_help}>
              <span> ({last_sync_count} new)</span>
            </Tooltip>
          </DescriptionList.Item>
        )}

        <DescriptionList.Item term="Last Sync">
          {storage.last_sync ? format(new Date(storage.last_sync), "yyyy-MM-dd HH:mm:ss") : "未同步"}
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  );
};

const SummaryS3 = ({ storage }) => {
  return <DescriptionList.Item term="Bucket">{storage.bucket}</DescriptionList.Item>;
};

const GSCStorage = ({ storage }) => {
  return <DescriptionList.Item term="Bucket">{storage.bucket}</DescriptionList.Item>;
};

const AzureStorage = ({ storage }) => {
  return <DescriptionList.Item term="Container">{storage.container}</DescriptionList.Item>;
};

const RedisStorage = ({ storage }) => {
  return (
    <>
      <DescriptionList.Item term="Path">{storage.path}</DescriptionList.Item>
      <DescriptionList.Item term="Host">
        {storage.host}
        {storage.port ? `:${storage.port}` : ""}
      </DescriptionList.Item>
    </>
  );
};

const LocalStorage = ({ storage }) => {
  return <DescriptionList.Item term="Path">{storage.path}</DescriptionList.Item>;
};
