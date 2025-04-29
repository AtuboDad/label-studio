import { Button } from "apps/labelstudio/src/components";
import { Block, Elem } from "apps/labelstudio/src/utils/bem";
import type { FC } from "react";
import "./EmptyList.scss";
import { HeidiAi } from "apps/labelstudio/src/assets/images";

export const EmptyList: FC = () => {
  return (
    <Block name="empty-models-list">
      <Elem name="content">
        <Elem name="heidy">
          <HeidiAi />
        </Elem>
        <Elem name="title">创建一个新模型</Elem>
        <Elem name="caption">构建一个高质量的模型，使用LLM自动标记您的数据</Elem>
        <Button look="primary">创建模型</Button>
      </Elem>
    </Block>
  );
};
