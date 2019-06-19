import {
  GET_ROOMS,
  GET_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT
} from "../constants/index";

const initialState = {
  rooms: [],
  events: [
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 1,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 2,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 3,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 4,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 5,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 6,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 7,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 8,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    },
    {
      id: 0,
      start: "2019-04-14 08:00",
      end: "2019-04-14 14:00",
      resourceId: 9,
      title: "Ore de curs zilnice",
      rrule: "FREQ=WEEKLY;DTSTART=20190414T080000Z;BYDAY=MO,TU,WE,TH,FR",
      movable: false,
      resizable: false,
      bgColor: "#FF0000"
    }
  ]
};

function schedulerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case GET_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload]
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? (event = action.payload) : event
        )
      };

    default:
      return state;
  }
}

export default schedulerReducer;
