import React, { Component, PropTypes } from "react";
import { Image } from "react-native";
import { Image as CacheImage } from "react-native-expo-image-cache";
import { IMAGE_URL } from "../../constants";
import colors from "../../constants/Colors";

// import { BaseImage } from "../../components/UI/BaseUI";

export default class ScaledImage extends Component {
  constructor(props) {
    super(props);
    let source;
    let sourceURI;
    if (typeof this.props.source === "string") {
      sourceURI = IMAGE_URL + this.props.source;
      source = {
        uri: IMAGE_URL + this.props.source,
      };
    } else {
      source = this.props.source;
      sourceURI = this.props.source;
    }

    this.state = {
      source: source,
      sourceURI: sourceURI,
      color: colors.WHITE,
      minHeight: 400,
    };
  }

  onLoadEnd = () => {
    this.state.color = "transparent";
    if (this.props.onLoadEnd) this.props.onLoadEnd();
    this.setState({ minHeight: 0 });
  };

  componentDidMount() {
    if (typeof this.state.sourceURI === "string") {
      Image.getSize(this.state.sourceURI, (width, height) => {
        if (this.props.width && !this.props.height) {
          this.setState({
            width: this.props.width,
            height: height * (this.props.width / width),
          });
        } else if (!this.props.width && this.props.height) {
          this.setState({
            width: width * (this.props.height / height),
            height: this.props.height,
          });
        } else {
          this.setState({ width: width, height: height });
        }
      });
    } else {
      const meta = Image.resolveAssetSource(this.state.sourceURI);
      if (!meta || !meta.width || !meta.height)
        return this.setState({ width: 0, height: 0 });

      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height:
            Image.resolveAssetSource(this.state.sourceURI).height *
            (this.props.width /
              Image.resolveAssetSource(this.state.sourceURI).width),
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width:
            Image.resolveAssetSource(this.state.sourceURI).width *
            (this.props.height /
              Image.resolveAssetSource(this.state.sourceURI).height),
          height: this.props.height,
        });
      } else {
        this.setState({
          width: Image.resolveAssetSource(this.state.sourceURI).width,
          height: Image.resolveAssetSource(this.state.sourceURI).height,
        });
      }
    }
  }

  render() {
    return (
      <Image
        {...this.props}
        source={this.state.source}
        onLoadEnd={this.onLoadEnd}
        style={[
          { backgroundColor: this.state.color },
          {
            minHeight: this.state.minHeight,
            height: this.state.height,
            width: this.state.width,
          },
          this.props.style,
        ]}
      />
    );
  }
}

ScaledImage.propTypes = {
  //   source: PropTypes.string.isRequired,
  //   width: PropTypes.number,
  //   height: PropTypes.number,
};
