import React from "react";
import { Curious } from "./Context";

import { ConfirmationFunction } from "@hickory/root";
import { CuriRouter } from "@curi/router";

export interface BlockProps {
  active?: boolean;
  confirm: ConfirmationFunction;
}

interface BaseBlockProps extends BlockProps {
  router: CuriRouter;
}

class BaseBlock extends React.Component<BaseBlockProps> {
  static defaultProps = {
    active: true
  };

  on() {
    this.props.router.history.confirmWith(this.props.confirm);
  }

  off() {
    this.props.router.history.removeConfirmation();
  }

  componentDidMount() {
    if (this.props.active) {
      this.on();
    }
  }

  componentDidUpdate(prevProps: BaseBlockProps) {
    if (
      this.props.active === prevProps.active &&
      this.props.confirm === prevProps.confirm
    ) {
      return;
    }
    this.off();
    if (this.props.active) {
      this.on();
    }
  }

  componentWillUnmount() {
    this.off();
  }

  render(): null {
    return null;
  }
}

export default function Block(props: BlockProps): React.ReactElement<any> {
  return (
    <Curious>
      {({ router }) => <BaseBlock {...props} router={router} />}
    </Curious>
  );
}
