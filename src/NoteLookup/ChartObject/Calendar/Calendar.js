import React from "react";
import CalendarDay from "./CalendarDay";

class Calendar extends React.Component {
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
  render() {
    return (
      <div className="CalendarGrid">
        <div className="CalendarWeekday">Sun</div>
        <div className="CalendarWeekday">Mon</div>
        <div className="CalendarWeekday">Tue</div>
        <div className="CalendarWeekday">Wed</div>
        <div className="CalendarWeekday">Thu</div>
        <div className="CalendarWeekday">Fri</div>
        <div className="CalendarWeekday">Sat</div>
        {
          //days
          this.props.calendardays.map((date, index) => {
            var _date = new Date(date.join("-"));
            var weekday = _date.getDay();
            var isToday = this.isSameDay(_date, this.props.datecelestial);
            var isCurrent = this.isSameDay(_date, this.props.chosen);
            return (
              <div key={index}>
                <CalendarDay
                  members={this.props.members}
                  freetime={this.props.freeTime}
                  events={this.props.events}
                  weekday={weekday}
                  inviteInitial={this.props.inviteInitial}
                  plansShowing={this.props.plansShowing}
                  invites={this.props.invites}
                  calendar={this.props.calendar ? this.props.calendar : []}
                  isToday={isToday}
                  isCurrent={isCurrent}
                  _date={_date}
                  assignments={this.props.assignments}
                  notes={this.props.notes}
                  chosen={this.props.chosen}
                  month={this.props.month}
                  year={this.props.year}
                  gotoDate={this.props.gotoDate}
                  datecelestial={this.props.datecelestial}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default Calendar;
