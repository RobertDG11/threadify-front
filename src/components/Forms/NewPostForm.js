import React from "react";
import {
  Button,
  Icon,
  Form,
  Segment,
  Header,
  Message,
  Dropdown,
  Search
} from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modifyLoginForm } from "../redux/actions/actions";
import { login } from "../redux/reducers/authReducer";
import { Required, Email } from "./Validation";
import Aux from "../../hoc/aux";
import Uploader from "../CloudinaryUploader";
import { addPost, addTags } from "../redux/reducers/postReducer";
import TextareaAutosize from "react-textarea-autosize";
import CloudinaryUploader from "../CloudinaryUploaderPost";
import { Editor } from "@tinymce/tinymce-react";
import _ from "lodash";

const FormField = ({
  input,
  meta: { touched, error, visited, active },
  as: As = Form.Input,
  ...props
}) => {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }

  const showError = () => {
    if (touched && error) {
      return true;
    }
    return false;
  };

  return (
    <Form.Field>
      <As
        {...input}
        value={input.value}
        {...props}
        onChange={handleChange}
        error={showError()}
      />

      {showError() ? (
        <span style={{ color: "red" }}>
          <Icon name="times circle outline" />
          {touched && error}
        </span>
      ) : null}
    </Form.Field>
  );
};

const options = [
  {
    key: 1,
    text: "HOT",
    value: "HOT",
    color: "red"
  },
  {
    key: 2,
    text: "POPULAR",
    value: "POPULAR",
    color: "blue"
  },
  {
    key: 3,
    text: "ART",
    value: "ART",
    color: "teal"
  },
  {
    key: 4,
    text: "OC",
    value: "OC",
    color: "orange"
  },
  {
    key: 5,
    text: "MEME",
    value: "MEME",
    color: "pink"
  },
  {
    key: 6,
    text: "NSFW",
    value: "NSFW",
    color: "black"
  },
  {
    key: 7,
    text: "SHITPOST",
    value: "SHITPOST",
    color: "brown"
  }
];

const renderLabel = label => ({
  color: `${label.color}`,
  content: `${label.text}`
});

class ConnectedLoginForm extends React.Component {
  state = {
    text: "",
    searchQuery: "",
    value: [],
    tags: [],
    media: "",
    isLoading: false,
    results: [],
    searchValue: ""
  };
  handleChange = (e, { searchQuery, value }) => {
    this.setState({
      searchQuery,
      value,
      tags: value.map(val => ({
        tag: val,
        postId: 1,
        color: options.find(option => option.value === val).color
      }))
    });
  };

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  handleResultSelect = (e, { result }) =>
    this.setState({ searchValue: result.title, threadId: result.id });

  handleSearchChangeThread = (e, { value }) => {
    this.setState({ isLoading: true, searchValue: value });

    setTimeout(() => {
      //if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.searchValue), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.threads, isMatch)
      });
    }, 300);
  };

  handleBold = () => {
    this.setState({ text: `${this.state.text}<b></b>` });
  };

  handleItalic = () => {
    this.setState({ text: `${this.state.text}<i></i>` });
  };

  handleUnderline = () => {
    this.setState({ text: `${this.state.text}<ins></ins>` });
  };

  handleEditorChange = e => {
    this.setState({ text: e.target.getContent() });
  };

  submitHandle = async data => {
    const { valid } = this.props;
    if (valid && this.state.searchValue) {
      const { title, upload } = data;
      let media = "none";

      if (upload) {
        media = upload;
      }

      const post = {
        title,
        text: this.state.text,
        media: upload,
        status: "ACCEPTED",
        ownerId: this.props.user.id,
        threadId: this.state.threadId
      };

      const response = await this.props.addPost(post);
      let tags = this.state.tags;

      //   const result = await this.props.addTags(
      //     tags.map(tag => ({
      //       tag: tag.tag,
      //       color: tag.color,
      //       post: response.data.id
      //     }))
      //   );

      //console.log(result);

      this.props.history.push(`/front`);
    }
  };

  render() {
    const { isLoading, searchValue, results } = this.state;
    return (
      <Aux>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChangeThread, 500, {
            leading: true
          })}
          results={results}
          value={searchValue}
          style={{ padding: "25px" }}
        />
        <Form style={{ padding: "25px" }}>
          <Field
            component={FormField}
            name="title"
            required
            icon="pencil alternate"
            iconPosition="left"
            label="Title"
            labelPosition="right corner"
            placeholder="Pick a fancy title"
            type="text"
            validate={[Required]}
          />
          <Dropdown
            multiple
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            options={options}
            placeholder="Select tags"
            search
            searchQuery={this.state.searchQuery}
            selection
            value={this.state.value}
            renderLabel={renderLabel}
            style={{ width: "100%", marginTop: "10px" }}
          />
          <CloudinaryUploader post field="upload" />
          {/* <Button.Group style={{ marginTop: "20px" }}>
            <Button onClick={this.handleBold} icon>
              <Icon name="bold" />
            </Button>
            <Button icon>
              <Icon name="italic" />
            </Button>
            <Button icon>
              <Icon name="underline" />
            </Button>
            <Button icon>
              <Icon name="heading" />
            </Button>
            <Button icon>
              <Icon name="strikethrough" />
            </Button>
            <Button icon>
              <Icon name="linkify" />
            </Button>
          </Button.Group>
          <Button.Group style={{ marginTop: "20px" }} floated="right">
            <Button icon>
              <Icon name="smile outline" />
            </Button>
          </Button.Group>
          <Form.Field
            name="text"
            placeholder="Write everyting it's on your mind! Don't hesitate!"
            control={TextareaAutosize}
            onChange={e => this.setState({ text: e.target.value })}
            value={this.state.text}
            maxRows={50}
          /> */}
          <Editor
            apiKey="z7wifel0cg6x4z0cyqxre8pspd888fbw8xym4umkr1emgjqo"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor textcolor",
                "searchreplace visualblocks code fullscreen emoticons",
                "insertdatetime media table paste code help wordcount",
                "formatpainter permanentpen table"
              ],
              toolbar:
                "undo redo | formatselect | bold italic strikethrough forecolor backcolor permanentpen | link | table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons",
              content_css: [
                "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                "//www.tiny.cloud/css/codepen.min.css"
              ]
            }}
            onChange={this.handleEditorChange}
          />
          <Button
            style={{ width: "50%", margin: "20px auto" }}
            onClick={this.props.handleSubmit(this.submitHandle)}
            attached="bottom"
          >
            <Button.Content>Create post</Button.Content>
          </Button>
        </Form>
      </Aux>
    );
  }
}

const formConfiguration = {
  form: "post-form"
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(addPost(post)),
    addTags: tags => dispatch(addTags(tags))
  };
}

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLoginForm);

export default withRouter(reduxForm(formConfiguration)(LoginForm));
