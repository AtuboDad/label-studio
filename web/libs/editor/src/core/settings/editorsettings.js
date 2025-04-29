export default {
  enableHotkeys: {
    newUI: {
      title: "标注快捷键",
      description: "能够快速选择标签",
    },
    description: "Enable labeling hotkeys",
    onChangeEvent: "toggleHotkeys",
    defaultValue: true,
  },
  enableTooltips: {
    newUI: {
      title: "在工具提示中显示快捷键",
      description: "在工具和操作的提示中显示按键绑定",
    },
    description: "Show hotkey tooltips",
    onChangeEvent: "toggleTooltips",
    checked: "",
    defaultValue: false,
  },
  enableLabelTooltips: {
    newUI: {
      title: "在标签上显示快捷键",
      description: "在标签上显示按键绑定",
    },
    description: "Show labels hotkey tooltips",
    onChangeEvent: "toggleLabelTooltips",
    defaultValue: true,
  },
  showLabels: {
    newUI: {
      title: "显示区域标签",
      description: "显示区域标签名称",
    },
    description: "Show labels inside the regions",
    onChangeEvent: "toggleShowLabels",
    defaultValue: false,
  },
  continuousLabeling: {
    newUI: {
      title: "创建区域后保持标签选中状态",
      description: "允许使用选中的标签连续创建区域",
    },
    description: "Keep label selected after creating a region",
    onChangeEvent: "toggleContinuousLabeling",
    defaultValue: false,
  },
  selectAfterCreate: {
    newUI: {
      title: "创建区域后自动选中",
      description: "自动选中新创建的区域",
    },
    description: "Select regions after creating",
    onChangeEvent: "toggleSelectAfterCreate",
    defaultValue: false,
  },
  showLineNumbers: {
    newUI: {
      tags: "Text Tag",
      title: "显示行号",
      description: "识别和引用文档中的特定文本行",
    },
    description: "Show line numbers for Text",
    onChangeEvent: "toggleShowLineNumbers",
    defaultValue: false,
  },
  preserveSelectedTool: {
    newUI: {
      tags: "Image Tag",
      title: "保持选中工具",
      description: "跨任务保留选中的工具",
    },
    description: "Remember Selected Tool",
    onChangeEvent: "togglepreserveSelectedTool",
    defaultValue: true,
  },
  enableSmoothing: {
    newUI: {
      tags: "Image Tag",
      title: "缩放时像素平滑",
      description: "在放大时平滑图像像素",
    },
    description: "在缩放时启用图像平滑",
    onChangeEvent: "toggleSmoothing",
    defaultValue: true,
  },
};
