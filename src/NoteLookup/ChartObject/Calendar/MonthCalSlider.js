import React from "react";
import "./CalendarStyle.css";
import Calendar from "./Calendar";
import CalendarDay from "./CalendarDay";

export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};
class MonthCalSlider extends React.Component {
  constructor(props) {
    super(props);
    const _date = new Date();
    this.state = {
      assignments: [],
      today: _date,
      height: 0,
      width: 0
      //isMonthRunning: false
    };
    this.fo = React.createRef();
  }

  isSameDay = (date, basedate = new Date()) => {
    const basedateDate = basedate.getDate();
    const basedateMonth = basedate.getMonth() + 1;
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = date.getMonth() + 1;
    const dateYear = date.getFullYear();

    return (
      basedateDate === dateDate &&
      basedateMonth === dateMonth &&
      basedateYear === dateYear
    );
  };
  componentDidMount = () => {
    this.onresize();
    window.addEventListener("resize", this.onresize);
  };
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    window.removeEventListener("resize", this.onresize);
  };
  onresize = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      var no = this.fo.current && this.fo.current.offsetHeight;
      var width = this.fo.current && this.fo.current.offsetWidth;
      //no && this.setState({ openProducts: false });
      this.setState({ height: no, width });
    }, 20);
  };
  render() {
    const { isCurrent, diffMonths } = this.props;

    var filteredPlans = this.props.notes.filter(
      (plan, index) =>
        new Date(plan).getMonth() + 1 === this.props.month &&
        new Date(plan).getFullYear() === this.props.year
    );

    var _date = new Date(this.props.chosen);
    var isToday = this.isSameDay(_date, this.props.datecelestial);
    return (
      <div
        ref={this.fo}
        style={{
          zIndex: "1",
          display: "flex",
          userSelect: "none",
          height: "min-content"
        }}
      >
        <div
          style={{
            display: "grid",
            position: "relative",
            gridTemplateColumns: "1fr",
            backgroundColor: "rgba(0, 0, 0, 0.699)",
            top: "2%",
            left: "50%",
            borderRadius: "30px",
            color: "white",
            boxShadow: "1px 0px 7px rgba(0, 0, 0, 0.5)",
            transform: "translate(-50%, 0)",
            transition: "0.3s transform ease-in",
            zIndex: "20000",
            marginBottom: "20px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "min-content",
              position: "relative",
              borderRadius: "5px",
              backgroundImage:
                "radial-gradient(rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.878))"
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              //onClick={this.props.dayCalOpener}
              style={{
                display: "flex",
                position: "absolute",
                flexDirection: "row"
              }}
            >
              <div
                style={{
                  height: "56px",
                  display: "flex",
                  position: "relative"
                }}
              >
                {_date && (
                  <CalendarDay
                    key={_date}
                    smallplz={true}
                    plansShowing={this.props.plansShowing}
                    isToday={isToday}
                    isCurrent={isCurrent}
                    _date={_date}
                    notes={this.props.notes}
                    chosen={this.props.chosen}
                    month={this.props.month}
                    year={this.props.year}
                    gotoDate={this.props.gotoDate}
                    datecelestial={this.props.datecelestial}
                  />
                )}
              </div>
            </div>
            <div
              className="gototoday"
              onClick={() => this.props.gotoDate(this.props.datecelestial)}
            >
              &#8635;
            </div>
            <div onClick={this.props.offtho} className="CalendarHeader">
              <div
                style={
                  this.props.plansShowing ||
                  (!this.props.inviteInitial && !this.props.calendarInitial)
                    ? {
                        position: "absolute",
                        display: "flex",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        color: "rgb(60,120,160)"
                      }
                    : {
                        position: "absolute",
                        display: "flex",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        color: "rgb(120,120,140)"
                      }
                }
              >
                {filteredPlans.length}{" "}
                {this.props.plansShowing ||
                (!this.props.inviteInitial &&
                  !this.props.calendarInitial &&
                  !this.props.calendarInitial)
                  ? `plan${filteredPlans.length === 1 ? "" : "s"} ${
                      this.props.inviteInitial || this.props.calendarInitial
                        ? "showing"
                        : ""
                    }`
                  : `hidden plan${filteredPlans.length === 1 ? "" : "s"}`}
              </div>
              <div
                onClick={this.state.offtho}
                className={
                  this.props.datecelestial.getMonth() + 1 ===
                    this.props.month &&
                  this.props.datecelestial.getFullYear() === this.props.year
                    ? "CalendarMonth"
                    : this.props.datecelestial <
                      new Date(
                        this.props.year,
                        this.props.month,
                        this.props.datecelestial.getDate()
                      )
                    ? "CalendarMonthFuture"
                    : "CalendarMonthOff"
                }
              >
                {
                  Object.keys(CALENDAR_MONTHS)[
                    Math.max(0, Math.min(this.props.month - 1, 11))
                  ]
                }{" "}
                {
                  this.props.chosen.getMonth() + 1 === this.props.month &&
                  this.props.chosen.getFullYear() === this.props.year
                    ? isCurrent
                      ? this.props.datecelestial.getDate()
                      : /*: this.props.datecelestial.getMonth() ===
                      this.props.chosen.getMonth() &&
                    this.props.datecelestial.getFullYear() ===
                      this.props.chosen.getFullYear()*/
                        this.props.chosen.getDate()
                    : null
                  //: null
                }
                {this.props.chosen.getMonth() + 1 === this.props.month &&
                this.props.chosen.getFullYear() === this.props.year
                  ? ", "
                  : ""}
                {this.props.year}
              </div>
              <div
                style={{
                  marginTop: "-10px",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                  color: "rgba(250,250,250,.7)"
                }}
              >
                {isCurrent && diffMonths === 0
                  ? "Today"
                  : diffMonths === 0
                  ? "This month"
                  : diffMonths < 0
                  ? `${Math.abs(diffMonths)} month${
                      diffMonths !== -1 ? "s" : ""
                    } ago`
                  : `In ${diffMonths} month${diffMonths !== 1 ? "s" : ""}`}
              </div>
            </div>
            <Calendar
              members={this.props.members}
              freetime={this.props.freeTime || this.props.fromFilter}
              events={this.props.events}
              inviteInitial={
                this.props.inviteInitial || this.props.calendarInitial
              }
              plansShowing={this.props.plansShowing}
              notes={this.props.notes}
              assignments={[]}
              calendardays={this.props.calendardays}
              month={this.props.month}
              year={this.props.year}
              gotoDate={this.props.gotoDate}
              chosen={this.props.chosen}
              datecelestial={this.props.datecelestial}
            />
          </div>
          <div className="monthlyskip">
            <div
              className="monthlyl"
              onClick={this.props.handlePreviousMonth}
              style={{ userSelect: "none" }}
              //onMouseUp={this.clearPressureTimer}
            >
              Last
              <br />
              Month
            </div>
            <div className="closecal" onClick={this.props.monthCalCloser}>
              <div style={{ marginTop: "20px", fontSize: "15px" }}>
                {
                  Object.keys(CALENDAR_MONTHS)[
                    Math.max(0, Math.min(this.props.month - 1, 11))
                  ]
                }
              </div>
              Close
            </div>
            <div
              className="monthlyr"
              onClick={this.props.handleNextMonth}
              style={{ userSelect: "none" }}
              //onMouseUp={this.clearPressureTimer}
            >
              Next
              <br />
              Month
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthCalSlider;
