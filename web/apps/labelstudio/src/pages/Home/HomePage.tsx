import type { Page } from "../types/Page";
import { Button } from "@humansignal/shad/components/ui/button";
import { SimpleCard, Spinner } from "@humansignal/ui";
import { IconExternal, IconFolderAdd, IconHumanSignal, IconUserAdd, IconFolderOpen } from "@humansignal/icons";
import { HeidiTips } from "../../components/HeidiTips/HeidiTips";
import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../../providers/ApiProvider";
import { useState } from "react";
import { CreateProject } from "../CreateProject/CreateProject";
import { InviteLink } from "../Organization/PeoplePage/InviteLink";
import { Heading, Sub } from "@humansignal/typography";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const PROJECTS_TO_SHOW = 10;

const resources = [
  {
    title: "指引文档",
    url: "https://labelstud.io/guide/",
  },
  {
    title: "API 文档",
    url: "https://api.labelstud.io/api-reference/introduction/getting-started",
  },
  {
    title: "发布说明",
    url: "https://labelstud.io/learn/categories/release-notes/",
  },
  {
    title: "博客文章",
    url: "https://labelstud.io/blog/",
  },
  {
    title: "Slack社区",
    url: "https://slack.labelstud.io",
  },
];

const actions = [
  {
    title: "新建项目",
    icon: IconFolderAdd,
    type: "createProject",
  },
  {
    title: "邀请成员",
    icon: IconUserAdd,
    type: "invitePeople",
  },
] as const;

type Action = (typeof actions)[number]["type"];

export const HomePage: Page = () => {
  const api = useAPI();
  const history = useHistory();
  const [creationDialogOpen, setCreationDialogOpen] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const { data, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["projects", { page_size: 10 }],
    async queryFn() {
      return api.callApi<{ results: APIProject[]; count: number }>("projects", {
        params: { page_size: PROJECTS_TO_SHOW },
      });
    },
  });

  const handleActions = (action: Action) => {
    return () => {
      switch (action) {
        case "createProject":
          setCreationDialogOpen(true);
          break;
        case "invitePeople":
          setInvitationOpen(true);
          break;
      }
    };
  };

  return (
    <main className="p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_450px] gap-6">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Heading size={1}>欢迎使用 👋</Heading>
            <Sub>让我们愉快的开始吧。</Sub>
          </div>
          <div className="flex justify-start gap-4">
            {actions.map((action) => {
              return (
                <Button
                  key={action.title}
                  className="flex-grow-0 text-16/24 text-primary-content text-left justify-start min-w-[250px] [&_svg]:w-6 [&_svg]:h-6"
                  variant="lsOutline"
                  onClick={handleActions(action.type)}
                >
                  <action.icon className="text-primary-icon" />
                  {action.title}
                </Button>
              );
            })}
          </div>

          <SimpleCard
            title={
              data && data?.count > 0 ? (
                <>
                  最近打开项目{" "}
                  <a href="/projects" className="text-lg font-normal hover:underline">
                    更多
                  </a>
                </>
              ) : null
            }
          >
            {isFetching ? (
              <div className="h-64 flex justify-center items-center">
                <Spinner />
              </div>
            ) : isError ? (
              <div className="h-64 flex justify-center items-center">无法加载项目列表...</div>
            ) : isSuccess && data.results.length === 0 ? (
              <div className="flex flex-col justify-center items-center border border-primary-border-subtle bg-primary-emphasis-subtle rounded-lg h-64">
                <div
                  className={
                    "rounded-full w-12 h-12 flex justify-center items-center bg-accent-grape-subtle text-primary-icon"
                  }
                >
                  <IconFolderOpen />
                </div>
                <Heading size={2}>创建第一个项目</Heading>
                <Sub>导入数据并设置标签界面，开始标注</Sub>
                <Button className="mt-4" onClick={() => setCreationDialogOpen(true)}>
                  新建项目
                </Button>
              </div>
            ) : isSuccess && data.results.length > 0 ? (
              <div className="flex flex-col gap-1">
                {data.results.map((project) => {
                  return <ProjectSimpleCard key={project.id} project={project} />;
                })}
              </div>
            ) : null}
          </SimpleCard>
        </section>
        {/* <section className="flex flex-col gap-6">
          <HeidiTips collection="projectSettings" />
          <SimpleCard title="相关资源" description="学习、探索、获得帮助">
            <ul>
              {resources.map((link) => {
                return (
                  <li key={link.title}>
                    <a
                      href={link.url}
                      className="py-2 px-1 flex justify-between items-center text-neutral-content"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.title}
                      <IconExternal className="text-primary-icon" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </SimpleCard>
          <div className="flex gap-2 items-center">
            <IconHumanSignal />
            <span className="text-neutral-content-subtle">当前版本: 社区版（Community）</span>
          </div>
        </section> */}
      </div>
      {creationDialogOpen && <CreateProject onClose={() => setCreationDialogOpen(false)} />}
      <InviteLink opened={invitationOpen} onClosed={() => setInvitationOpen(false)} />
    </main>
  );
};

HomePage.title = "首页";
HomePage.path = "/";
HomePage.exact = true;

function ProjectSimpleCard({
  project,
}: {
  project: APIProject;
}) {
  const finished = project.finished_task_number ?? 0;
  const total = project.task_number ?? 0;
  const progress = (total > 0 ? finished / total : 0) * 100;
  const white = "#FFFFFF";
  const color = project.color && project.color !== white ? project.color : "#E1DED5";

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block even:bg-neutral-surface rounded-sm overflow-hidden"
      data-external
    >
      <div
        className="grid grid-cols-[minmax(0,1fr)_150px] p-2 py-3 items-center border-l-[3px]"
        style={{ borderLeftColor: color }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-neutral-content">{project.title}</span>
          <div className="text-neutral-content-subtler text-sm">
          任务总数： {total} ，任务完成量：{finished} ，完成度： ({total > 0 ? Math.round((finished / total) * 100) : 0}%)
          </div>
        </div>
        <div className="bg-neutral-surface rounded-full overflow-hidden w-full h-2 shadow-neutral-border-subtle shadow-border-1">
          <div className="bg-positive-surface-hover h-full" style={{ maxWidth: `${progress}%` }} />
        </div>
      </div>
    </Link>
  );
}
