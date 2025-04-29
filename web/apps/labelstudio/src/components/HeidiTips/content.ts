import type { TipsCollection } from "./types";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "你知道吗？",
      content: "使用Label Studio Enterprise将项目组织到工作区中时，更容易找到项目。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
        params: {
          experiment: "project_creation_tip",
          treatment: "find_and_manage_projects",
        },
      },
    },
    {
      title: "解锁更快的访问配置",
      content:
        "通过将员工分配到Label Studio Enterprise中的工作区，简化将员工分配给多个项目的过程。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "在企业平台中，管理员可以查看标注器性能仪表板，以优化资源分配、改进团队管理并通知薪酬。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "您可以使用Label Studio Enterprise控制内部团队成员和外部标注者对特定项目和工作区的访问。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "您可以使用或修改数十个模板来配置您的标签UI，或者使用简单的类XML标记从头开始创建自定义配置。",
      closable: true,
      link: {
        label: "更多",
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
    {
      title: "GenAI标签",
      content:
        "Label Studio提供了用于监督LLM微调、RAG检索排名、RLHF、聊天机器人评估等的模板。",
      closable: true,
      link: {
        label: "浏览模板",
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: "看起来你的团队正在成长！",
      content:
        "使用Label Studio Enterprise为您的团队分配角色，并在项目和工作区级别控制对敏感数据的访问。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing",
        },
      },
    },
    {
      title: "想要简化和安全登录吗？",
      content: "使用带有Label Studio Enterprise的SAML、SCIM2或LDAP为您的团队启用单点登录。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "尝试Label Studio Starter Cloud，它针对小型团队和项目进行了优化。",
      closable: true,
      link: {
        label: "更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "organization_page_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "想要自动化任务分配吗？",
      content:
        "创建规则，自动将任务分配给标注器，并仅在每个标注器的视图中显示分配给它们的任务。并控制每个标注器任务的可见性。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: "与社区分享知识",
      content:
        "有问题或提示要与其他Label Studio用户分享吗？加入社区slack频道获取最新更新。",
      closable: true,
      link: {
        label: "加入社区",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "Label Studio支持与云存储、机器学习模型和流行工具的多点集成，以自动化您的机器学习管道。",
      closable: true,
      link: {
        label: "查看集成目录",
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points",
        },
      },
    },
  ],
  projectSettings: [
    {
      title: "使用自动标签节省时间",
      content:
        "使用自动化立即标记大规模数据集，而不会牺牲企业平台的质量。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "您可以使用Label Studio Enterprise通过审阅者工作流和任务协议得分来提高标记数据的质量。",
      closable: true,
      link: {
        label: "更多",
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: "评估GenAI模型",
      content:
        "结合自动化和人工监督，在企业平台上评估和确保法学硕士的质量。",
      closable: true,
      link: {
        label: "更多",
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "通过使用企业云服务，您可以节省管理基础设施和升级的时间，并访问更多自动化、质量和团队管理功能。",
      closable: true,
      link: {
        label: "更多",
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "尝试Label Studio Starter Cloud，它针对小型团队和项目进行了优化。",
      link: {
        label: "更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_settings_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "您可以使用后端SDK连接ML模型，以节省预标记或主动学习的时间。",
      closable: true,
      link: {
        label: "更多",
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models",
        },
      },
    },
  ],
};
