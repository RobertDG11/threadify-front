import React from "react";
import { Icon, Button, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reduxForm } from "redux-form";
import Aux from "../hoc/aux";

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      media: "",
      selected: ""
    };

    this.widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: "robertdg11",
        upload_preset: "lys36ggf",
        multiple: false,
        singleUploadAutoClose: false
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.props.change(this.props.field, result.info.url);
          this.setState({ media: result.info.url, selected: "image" });
          console.log("Done! Here is the image info: ", result);
        }
      }
    );
  }

  componentWillUnmount = () => {
    this.widget.close();
  };

  showWidget = () => {
    this.widget.open();
  };

  handleChange = e => {
    this.setState({ media: `video ${e.target.value}` });
    this.props.change(this.props.field, this.state.media);
  };

  render() {
    console.log(this.state.media);
    console.log(this.state.selected);
    return this.props.post ? (
      <Aux>
        <Button.Group style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Button onClick={this.showWidget}>Image</Button>
          <Button.Or />
          <Button onClick={() => this.setState({ selected: "video" })}>
            Video
          </Button>
        </Button.Group>
        {this.state.selected === "video" ? (
          <Input
            icon="film"
            iconPosition="left"
            placeholder="Add a link to a video"
            onChange={e => this.handleChange(e)}
            style={{ marginLeft: "20px" }}
          />
        ) : null}
      </Aux>
    ) : (
      <Button icon labelPosition="left" onClick={this.showWidget}>
        <Icon name="file" />
        Upload cover photo
      </Button>
    );
  }
}

const formConfiguration = {
  form: "thread-form"
};

export default reduxForm(formConfiguration)(Uploader);
