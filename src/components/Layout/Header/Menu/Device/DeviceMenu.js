import React from "react";
import { Menu, MenuItem, Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadLiterals } from "../../../../redux/actions/actions";
import loadLang from "../../../../../i18n/index";

import styles from "../Menu.module.scss";

const ConnectedDeviceMenu = props => {
  const options = [
    { key: 1, flag: "ro", value: "ro" },
    { key: 2, flag: "uk", value: "en" }
  ];

  const handleChange = (e, { value }) => {
    props.loadLiterals(value);
  };

  return (
    <Menu inverted pointing secondary size="large" className={styles.FixedMenu}>
      <MenuItem onClick={props.handleToggle}>
        <Icon size="large" name="sidebar" />
      </MenuItem>
      <MenuItem position="right">
        <Dropdown onChange={handleChange} options={options} selection compact />
      </MenuItem>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadLiterals: lang =>
      loadLang(lang).then(lang => dispatch(loadLiterals(lang)))
  };
}

const DeviceMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDeviceMenu);

export default DeviceMenu;
