import { observer } from "mobx-react";
import { IconRedo, IconRemove, IconUndo } from "@humansignal/icons";
import { Tooltip } from "@humansignal/ui";
import { Button } from "../../common/Button/Button";
import { Block, Elem } from "../../utils/bem";
import "./HistoryActions.scss";

export const EditingHistory = observer(({ entity }) => {
  const { history } = entity;

  return (
    <Block name="history-buttons">
      <Tooltip title="撤回">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Undo"
          disabled={!history?.canUndo}
          onClick={() => entity.undo()}
          icon={<IconUndo />}
        />
      </Tooltip>
      <Tooltip title="恢复">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Redo"
          disabled={!history?.canRedo}
          onClick={() => entity.redo()}
          icon={<IconRedo />}
        />
      </Tooltip>
      <Tooltip title="重置">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="Reset"
          disabled={!history?.canUndo}
          onClick={() => history?.reset()}
          icon={<IconRemove />}
        />
      </Tooltip>
    </Block>
  );
});
