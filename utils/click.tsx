import { debounce } from "lodash"; // 4.0.8
import React from "react";

export const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props['onPress'] && this.props['onPress']();
    };

    onPress = debounce(this.debouncedOnPress, 0, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  return PreventDoubleClick;
};
