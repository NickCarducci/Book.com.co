import React from "react";
import TodayPlans from "./TodayPlans";
import TodaySun from "./TodaySun";

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
    var _datezero = this.props._date;
    _datezero.setHours(0, 0, 0, 0);
    let filtered = [];
    var thePlans = this.props.notes.filter((x) => {
      //const isToday = isSameDay(_date, today);
      const plandate = new Date(x);
      plandate.setHours(0, 0, 0, 0);
      if (plandate.getTime() === _datezero.getTime()) {
        filtered.push(x);
      }
      return filtered;
    });
    this.state = { thePlans };
    this.is = React.createRef();
  }
  getDateISO = (date = new Date()) => {
    return [
      date.getFullYear(),
      this.zeroPad(date.getMonth() + 1, 2),
      this.zeroPad(date.getDate(), 2)
    ].join("-");
  };

  zeroPad = (value, length) => `${value}`.padStart(length, "0");
  componentDidUpdate = (prevProps) => {
    if (this.props.notes !== prevProps.notes) {
      var _datezero = this.props._date;
      _datezero.setHours(0, 0, 0, 0);
      let filtered = [];
      var thePlans = this.props.notes.filter((x) => {
        //const isToday = isSameDay(_date, today);
        const plandate = new Date(x);
        plandate.setHours(0, 0, 0, 0);
        if (plandate.getTime() === _datezero.getTime()) {
          filtered.push(x);
        }
        return filtered;
      });
      this.setState({ thePlans });
    }
  };
  render() {
    const { isToday, isCurrent } = this.props;
    const yest = this.props._date < this.props.datecelestial;
    var datet = this.props._date.getDate();
    var inMonth =
      this.props.month === this.props._date.getMonth() + 1 &&
      this.props.year === this.props._date.getFullYear();

    /*var diff = Math.floor(
      new Date(
        this.props.year,
        this.props.month,
        this.props.today.getDate()
      ).getTime() - this.props.today.getTime()
    );
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);*/
    var hold = this.is.current && this.is.current.offsetHeight;
    return (
      <div
        ref={this.is}
        className={
          isCurrent
            ? "HighlightedCalendarDate"
            : isToday
            ? "TodayCalendarDate"
            : inMonth && !yest
            ? "CalendarDateNumber"
            : "PrevPostDateNumber"
        }
        style={{ width: hold }}
        onClick={() => this.props.gotoDate(this.props._date)}
      >
        {isToday && (
          <TodaySun
            height={hold}
            smallplz={this.props.smallplz}
            datecelestial={this.props.datecelestial}
            _date={this.props._date}
            date={this.props.date}
            chosen={this.props.chosen}
            month={this.props.month}
            year={this.props.year}
            isToday={isToday}
          />
        )}
        {(this.state.thePlans.length > 0 ||
          this.state.invites.length > 0 ||
          (this.props.assignments && this.props.assignments.length > 0) ||
          this.props.events.length > 0) && (
          <TodayPlans
            members={this.props.members ? this.props.members : []}
            freetime={this.props.freeTime}
            events={this.props.events}
            height={hold}
            smallplz={this.props.smallplz}
            inviteInitial={this.props.inviteInitial}
            plansShowing={this.props.plansShowing}
            thePlans={this.state.thePlans}
            invites={this.state.invites}
            calendar={this.state.calendar}
            assignments={this.state.assignments}
            _date={this.props._date}
          />
        )}
        <div
          className={
            this.props.smallplz && hold < 100
              ? "square"
              : this.props.smallplz
              ? "squaretop"
              : "square"
          }
          style={
            yest && inMonth && !isCurrent && !isToday
              ? {
                  color: "rgb(100,100,130)",
                  backgroundColor: "rgba(28,124,132,.4)",
                  border: "rgba(28,124,132,.1) 8px solid",
                  borderRadius: "100px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "22px"
                }
              : inMonth
              ? { color: "#888", fontSize: "22px" }
              : { color: "#555", fontSize: "22px" }
          }
        >
          <div className="content">{datet}</div>
        </div>
        <div style={{ position: "absolute", bottom: "0px", fontSize: "12px" }}>
          {
            ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"][
              this.props.weekday
            ]
          }
        </div>
      </div>
    );
  }
}

export default CalendarDay;
