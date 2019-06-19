import {
  SHOW_CAROUSEL,
  ADD_REGISTER_SUCCES,
  MODIFY_ACTIVEITEMS,
  MODIFY_LOGINMODAL,
  DELETE_REGISTER_SUCCES,
  AUTHENTICATE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  DEAUTHENTICATE,
  UPDATE_TOKEN,
  GET_ROOMS,
  GET_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  LOAD_LITERALS,
  ADD_PROFESSORS,
  ADD_FIELD,
  REMOVE_FIELD
} from "../constants/index";
import http from "../../../hoc/Interceptor";
import axios from "axios";
import "../../../hoc/Interceptor";
import { toast } from "react-toastify";
import { store } from "../store";

export const carouselVisible = payload => {
  return {
    type: SHOW_CAROUSEL,
    payload
  };
};

export const modifyActiveItem = payload => {
  return {
    type: MODIFY_ACTIVEITEMS,
    payload
  };
};

export const modifyLoginForm = payload => {
  return {
    type: MODIFY_LOGINMODAL,
    payload
  };
};

export const addRegisterSucces = payload => {
  return {
    type: ADD_REGISTER_SUCCES,
    payload
  };
};
export const deleteRegisterSucces = payload => {
  return {
    type: DELETE_REGISTER_SUCCES,
    payload
  };
};

export const deauthenticate = () => async dispatch => {
  // try {
  //   const response = await http.post("/logout", {});
  //   dispatch({ type: DEAUTHENTICATE });

  //   toast.success(response.data.message, {
  //     position: toast.POSITION.TOP_CENTER
  //   });
  // } catch (error) {
  //   if (error.response) {
  //     toast.error(error.response.data.message, {
  //       position: toast.POSITION.TOP_CENTER
  //     });
  //   }
  // }
  dispatch({ type: DEAUTHENTICATE });
};

export const updateToken = payload => {
  return {
    type: UPDATE_TOKEN,
    payload
  };
};

export const getRooms = () => async dispatch => {
  try {
    const response = await http.get("/classroom");
    dispatch({ type: GET_ROOMS, payload: response.data });
    return response.data;
  } catch (error) {
    toast.error("Intampinam dificultati tehnice, va rugam asteptati!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const getEvents = () => async dispatch => {
  try {
    const response = await http.get("/booking");
    let newEvents = [];
    response.data.forEach(element => {
      newEvents.push({
        id: element.id,
        resourceId: element.classroom_id,
        start: element.start,
        end: element.end,
        bgColor: element.color,
        initiator: element.booker_id,
        title: element.name,
        file: element.file
      });
    });
    dispatch({ type: GET_EVENTS, payload: newEvents });
    return response.data;
  } catch (error) {
    toast.error("Intampinam dificultati tehnice, va rugam asteptati!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const addEvent = newEvent => async dispatch => {
  try {
    const response = await http.post("/booking", newEvent);
    const event = {
      id: response.data.id,
      resourceId: newEvent.classroom_id,
      start: newEvent.start,
      end: newEvent.end,
      bgColor: newEvent.color,
      initiator: newEvent.booker_id,
      title: newEvent.name,
      file: newEvent.file
    };
    dispatch({
      type: ADD_EVENT,
      payload: event
    });
    return response.data;
  } catch (error) {
    toast.error("Intampinam dificultati tehnice, va rugam asteptati!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const updateEvent = newEvent => async dispatch => {
  try {
    const response = await http.put(`/booking/${newEvent.id}`, newEvent);
    const event = {
      id: newEvent.id,
      resourceId: newEvent.classroom_id,
      start: newEvent.start,
      end: newEvent.end,
      bgColor: newEvent.color,
      initiator: newEvent.booker_id,
      title: newEvent.name,
      file: newEvent.file
    };
    dispatch({
      type: UPDATE_EVENT,
      payload: event
    });
  } catch (error) {
    toast.error("Intampinam dificultati tehnice, va rugam asteptati!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const loadLiterals = literals => ({
  type: LOAD_LITERALS,
  payload: literals
});

export const addProfessors = () => async dispatch => {
  const result = await axios.get(
    "https://randomuser.me/api/?results=30&nat=de,fr,gb&inc=name,picture&noinfo"
  );
  let source = [];
  result.data.results.forEach(element => {
    const firstName =
      element.name.first.charAt(0).toUpperCase() + element.name.first.slice(1);
    const lastName =
      element.name.last.charAt(0).toUpperCase() + element.name.last.slice(1);
    source.push({
      search: {
        title: `${firstName} ${lastName}`,
        description: "Matematica",
        image: element.picture.large
      },
      description:
        "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent.",
      dateHired: "21/05/1996"
    });
  });

  dispatch({
    type: ADD_PROFESSORS,
    payload: source
  });
};

export const addField = payload => {
  return {
    type: ADD_FIELD,
    payload
  };
};

export const removeFields = () => {
  return {
    type: REMOVE_FIELD
  };
};
