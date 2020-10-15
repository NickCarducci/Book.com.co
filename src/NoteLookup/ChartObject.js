import React from "react";
import MonthCalSlider from "./ChartObject/Calendar/MonthCalSlider";
import dayjs from "dayjs";

import ChartTitle from "./ChartObject/ChartTitle";
import StrikeInfo from "./ChartObject/StrikeInfo";

export const THIS_YEAR = new Date().getFullYear();
export const THIS_MONTH = new Date().getMonth() + 1;

export const CALENDAR_MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

export const WEEK_DAYS = {
  0: "S",
  1: "M",
  2: "T",
  3: "W",
  4: "T",
  5: "F",
  6: "S"
};
export const WEEK_DAYSs = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday"
};
export const CALENDAR_WEEKS = 6;

class ChartObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthCalOpen: "month",
      calendardays: [],
      chosen: new Date(),
      month: new Date(props.date).getMonth() + 1,
      year: new Date(props.date).getFullYear(),
      datecelestial: new Date(),
      openOptionBook: ""
    };
    this.size = React.createRef();
  }
  getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;
    var f =
      month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31;
    return f;
  };

  getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    var firstDay = new Date(`${year}-${this.zeroPad(month, 2)}-01`);
    return firstDay.getDay() + 1;
  };
  getPreviousMonth = (month, year) => {
    const prevMonth = month > 1 ? month - 1 : 12;
    const prevMonthYear = month > 1 ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
  };

  getNextMonth = (month, year) => {
    const nextMonth = month < 12 ? month + 1 : 1;
    const nextMonthYear = month < 12 ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
  };

  zeroPad = (value, length) => `${value}`.padStart(length, "0");

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  percentToColor(weight) {
    var color1 = [50, 100, 200];
    var color2 = [0, 180, 50];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 - color2[0] * w2),
      Math.round(color1[1] * w1 - color2[1] * w2),
      Math.round(color1[2] * w1 - color2[2] * w2)
    ];
    return rgb;
  }
  componentDidUpdate = (prevProps) => {
    if (
      this.state.month !== this.state.lastMonth ||
      this.state.year !== this.state.lastYear
    ) {
      this.resetTime();
    }
  };
  resetTime = () => {
    const { month, year } = this.state;
    /*if (this.props.eventsInitial)
      this.props.queryDate([
        new Date([year, month, 1]),
        new Date([year, month, this.getMonthDays(month, year)])
      ]);*/
    const monthDays = this.getMonthDays(month, year);

    var lastDay = new Date(year, month - 1, monthDays);
    lastDay.setHours(0, 0, 0, 0);
    this.setState({ lastDay: lastDay.getTime() });
    const monthFirstDay = this.getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth =
      CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

    const { month: prevMonth, year: prevMonthYear } = this.getPreviousMonth(
      month,
      year
    );
    const { month: nextMonth, year: nextMonthYear } = this.getNextMonth(
      month,
      year
    );

    const prevMonthDays = this.getMonthDays(prevMonth, prevMonthYear);

    var firstDay = new Date(prevMonthYear, prevMonth - 1, prevMonthDays);

    firstDay.setHours(0, 0, 0, 0);
    this.setState({ firstDay: firstDay.getTime() });
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
      const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
      return [prevMonthYear, this.zeroPad(prevMonth, 2), this.zeroPad(day, 2)];
    });

    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
      const day = index + 1;
      return [year, this.zeroPad(month, 2), this.zeroPad(day, 2)];
    });

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
      const day = index + 1;
      return [nextMonthYear, this.zeroPad(nextMonth, 2), this.zeroPad(day, 2)];
    });
    var calendardays = [
      ...prevMonthDates,
      ...thisMonthDates,
      ...nextMonthDates
    ];

    this.setState({
      lastMonth: this.state.month,
      lastYear: this.state.year,
      calendardays
    });
  };

  // last month - Called in shift = false ? ternary
  gotoPreviousMonth = () => {
    const { month, year } = this.state;
    var prevMonth = month > 1 ? month - 1 : 12;
    var prevMonthYear = month > 1 ? year : year - 1;
    this.setState({
      month: prevMonth,
      year: prevMonthYear
    });
    this.props.eventsInitial &&
      this.props.queryDate([
        [prevMonthYear, this.zeroPad(prevMonth, 2), this.zeroPad(1, 2)],
        [
          prevMonthYear,
          this.zeroPad(prevMonth, 2),
          this.getMonthDays(prevMonth, prevMonthYear)
        ]
      ]);
  };
  // next month - Called in shift = false ? ternary
  gotoNextMonth = () => {
    const { month, year } = this.state;
    var nextMonth = month < 12 ? month + 1 : 1;
    var nextMonthYear = month < 12 ? year : year + 1;
    this.setState({
      month: nextMonth,
      year: nextMonthYear
    });
    this.props.eventsInitial &&
      this.props.queryDate([
        [nextMonthYear, this.zeroPad(nextMonth, 2), this.zeroPad(1, 2)],
        [
          nextMonthYear,
          this.zeroPad(nextMonth, 2),
          this.getMonthDays(nextMonth, nextMonthYear)
        ]
      ]);
  };

  handlePreviousMonth = (evt) => {
    evt && evt.preventDefault();
    const { year } = this.state;
    evt.shiftKey ? this.setState({ year: year - 1 }) : this.gotoPreviousMonth();
    //this.handlePressure(fn);
  };
  //next month - from onClick={this.handleNext}
  handleNextMonth = (evt) => {
    evt && evt.preventDefault();
    const { year } = this.state;
    evt.shiftKey ? this.setState({ year: year + 1 }) : this.gotoNextMonth();
    //this.handlePressure(fn);
  };
  handlePreviousDay = (evt) => {
    console.log("less");
    evt && evt.preventDefault();
    const day = this.state.chosen.getDate();
    const month = this.state.chosen.getMonth();
    const year = this.state.chosen.getFullYear();
    let newnewMonth = month > 1 ? month - 1 : 12;
    let newnewYear = month > 1 ? year : year - 1;
    //const prevMonthDays = this.getMonthDays(newnewMonth, newnewYear);
    let newDay, newMonth, newYear;

    if (day <= 1) {
      newDay = this.getMonthDays(newnewMonth + 1, newnewYear);
      newMonth = month > 1 ? month - 1 : 12;
      newYear = month > 1 ? year : year - 1;
    } else {
      newDay = day - 1;
      newMonth = month;
      newYear = year;
    }
    //this.setState({ day: newDay, month: newMonth, year: newYear });
    this.setState({
      chosen: new Date(newYear, newMonth, newDay),
      year,
      month: month + 1
    });
  };
  handleNextDay = (evt) => {
    evt && evt.preventDefault();
    const day = this.state.chosen.getDate();
    const month = this.state.chosen.getMonth();
    const year = this.state.chosen.getFullYear();
    const thisMonthDays = this.getMonthDays(month, year);
    let newDay, newMonth, newYear;

    if (day >= thisMonthDays) {
      newDay = 1;
      newMonth = month < 12 ? month + 1 : 1;
      newYear = month < 12 ? year : year + 1;
    } else {
      newDay = day + 1;
      newMonth = month;
      newYear = year;
    }
    //this.setState({ day: newDay, month: newMonth, year: newYear });
    this.setState({
      chosen: new Date(newYear, newMonth, newDay),
      year,
      month: month + 1
    });
  };
  isSameDay = (date, basedate = new Date()) => {
    const basedateDate = basedate.getDate();
    const basedateMonth = basedate.getMonth();
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    return (
      basedateDate === dateDate &&
      basedateMonth === dateMonth &&
      basedateYear === dateYear
    );
  };
  backtotoday = (evt) => {
    evt && evt.preventDefault();
    const month = this.state.datecelestial.getMonth();
    const year = this.state.datecelestial.getFullYear();

    this.setState({ chosen: this.state.datecelestial, month, year });
  };
  gotoDate = (date) => {
    if (!this.isSameDay(date, this.state.chosen)) {
      var da =
        date.getFullYear() +
        "-" +
        this.zeroPad(date.getMonth() + 1, 2) +
        "-" +
        date.getDate();
      this.props.shortenView(da);
      this.setState({
        chosen: date,
        month: date.getMonth() + 1,
        year: date.getFullYear()
      });
    } //else {
    //this.setState({ monthCalOpen: true });
    this.setState({ monthCalOpen: "day" });
    //}
  };
  componentDidMount = () => {
    this.resetTime();
  };
  render() {
    const { times, expirations, thisExpiration } = this.props;
    /*let thismonth = {};
    let today = {};
    this.state.times.map(x => {
      thismonth[new Date(x).getMonth()] = [];
      today[new Date(x).getDate()] = [];
    });*/
    var thisone = this.props.symbolsSeen.find((x) => x.symbol === this.props.i);
    var thisonehistory =
      this.props.symbols &&
      this.props.symbols.find((x) => x.symbol === this.props.thisone.symbol);

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var monthdif = today.getMonth();
    var yeardif = today.getFullYear();
    var selectedMonth = new Date(
      this.state.year,
      this.state.month - 1,
      1
    ).getTime();
    var todayFirst = new Date(yeardif, monthdif, 1).getTime();

    var diffMonths = Number(
      Math.round((selectedMonth - todayFirst) / 2453300000)
    );
    var isCurrent = this.isSameDay(this.state.datecelestial, this.state.chosen);
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          backgroundColor: "rgb(220,220,250)",
          borderBottom: "1px white solid",
          top: "0px",
          width: "100%",
          alignItems: "center",
          color: "navy",
          flexWrap: "wrap",
          height: "min-content"
        }}
      >
        &nbsp;&nbsp;${thisone && thisone.last}
        <div
          style={{
            marginLeft: "7px",
            marginBottom: "2px",
            backgroundColor: "white",
            color: "rgb(20,20,40)"
          }}
        >
          {this.props.i}
        </div>
        &nbsp;{this.formatDate(new Date())}
        &nbsp;
        {thisonehistory && expirations && thisone && thisExpiration && (
          <ChartTitle
            fix={this.props.chosenExpiration === thisExpiration}
            data={this.props.data}
            thisone={thisone.last}
            expirations={this.props.times}
            chosenExpiration={this.props.chosenExpiration}
            options={thisExpiration.options}
            thisonehistory={thisonehistory}
            openOptionBook={this.props.openOptionBook}
            chosenExchange={this.props.chosenExchange}
            token={this.props.token}
          />
        )}
        <div style={{ display: "flex" }}>
          <MonthCalSlider
            bookInitial={this.props.bookInitial}
            members={this.state.members}
            chooseMember={(x) => {
              if (this.state.members.includes(x.id)) {
                var copy = [...this.state.members];
                copy.splice(this.state.members.lastIndexOf(x.id), 1);
                this.setState({ members: copy });
              } else {
                this.setState({ members: [...this.state.members, x.id] });
              }
            }}
            freeTimeOn={() => this.setState({ freeTime: true })}
            freeTime={this.state.freeTime}
            fromFilter={this.state.fromFilter}
            fromFilterOn={() =>
              this.setState({ fromFilter: true, freeTime: false })
            }
            fromFilterOff={() =>
              this.setState({ fromFilter: false, freeTime: false })
            }
            foundEntity={this.props.foundEntity}
            recipients={
              this.props.bookInitial
                ? this.state.profile
                  ? [this.state.profile.id]
                  : []
                : this.props.recipients
            }
            users={this.props.users}
            calendarInitial={this.props.calendarInitial}
            eventsInitial={this.props.eventsInitial}
            offtho={
              this.state.plansShowing
                ? () => this.setState({ plansShowing: false })
                : () => this.setState({ plansShowing: true })
            }
            plansShowing={this.state.plansShowing}
            inviteInitial={this.props.inviteInitial}
            calendardays={this.state.calendardays}
            CALENDAR_MONTHS={CALENDAR_MONTHS}
            chosen={this.state.chosen}
            month={this.state.month}
            year={this.state.year}
            isCurrent={isCurrent}
            handleNextMonth={this.handleNextMonth}
            handlePreviousMonth={this.handlePreviousMonth}
            diffMonths={diffMonths}
            dayCalOpener={() => {
              if (isCurrent) {
                this.todayRef.current.scrollIntoView("smooth");
              }
              this.setState({
                monthCalOpen: "day"
              });
            }}
            monthCalCloser={() => {
              this.setState({
                monthCalOpen: null
              });
            }}
            monthCalOpener={() => {
              this.setState({
                monthCalOpen: "month"
              });
            }}
            monthCalOpen={this.state.monthCalOpen}
            notes={times}
            invites={[]}
            events={[]}
            calendar={[]}
            history={this.props.history}
            chooseDay={this.chooseDay}
            datecelestial={this.state.datecelestial}
            gotoDate={this.gotoDate}
          />
          <div
            style={
              this.props.chosenExpiration
                ? {
                    zIndex: "9999",
                    flexWrap: "wrap",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed"
                  }
                : {
                    zIndex: "9999",
                    flexWrap: "wrap",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    position: "relative"
                  }
            }
          >
            {times &&
              times.length > 0 &&
              times.map((x) => {
                if (
                  this.props.chosenExpiration === "" ||
                  this.props.chosenExpiration === x
                ) {
                  var per = this.percentToColor(
                    (new Date(x).getTime() -
                      new Date(times[times.length - 1]).getTime()) /
                      (new Date(times[0]).getTime() -
                        new Date(times[times.length - 1]).getTime())
                  );
                  var date = new Date(x);
                  var datenotime = new Date();
                  datenotime.setHours(date.getHours(), date.getMinutes(), 0, 0);
                  date.setSeconds(0);
                  date.setMilliseconds(0);
                  var diffDays = Math.round(
                    (date.getTime() - datenotime.getTime()) / 86400000
                  );
                  function renderDate(date) {
                    let d = dayjs(date);
                    return d.format("MM / DD / YYYY");
                  }
                  return (
                    <StrikeInfo
                      pause={this.props.pause}
                      play={this.props.play}
                      startTimer={this.props.startTimer}
                      key={x}
                      x={x}
                      date={date}
                      data={this.props.data}
                      renderDate={renderDate}
                      diffDays={diffDays}
                      per={per}
                      chosenExpiration={this.props.chosenExpiration}
                      chooseExpiration={() => {
                        this.props.shortenView(x);
                      }}
                      togglePut={this.props.togglePut}
                      toggleCall={this.props.toggleCall}
                      highlight={this.props.highlight}
                      useFilter={this.props.useFilter}
                      chooseFilter={this.props.chooseFilter}
                      //

                      options={this.props.options}
                      user={this.props.user}
                      bearer={this.props.bearer}
                      price={this.props.price}
                      openOptionBook={this.props.openOptionBook}
                      send={this.props.send}
                      token={this.props.token}
                      i={this.props.symbol}
                      chosenExchange={this.props.chosenExchange}
                    />
                  );
                } else return null;
              })}
          </div>
        </div>
        {/*this.state.openOptionBook && (
          <ChartResult
            openOptionBook={this.state.openOptionBook}
            chosenExchange={this.props.chosenExchange}
            token={this.props.token}
          />
        )*/}
      </div>
    );
  }
}
export default ChartObject;
