import React from "react";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";
const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

class TodaySun extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  render() {
    const _datezero = this.props._date.setHours(0, 0, 0, 0);
    const hour = this.props.datecelestial.getHours();
    const minute = this.props.datecelestial.getMinutes();
    const second = this.props.datecelestial.getSeconds();
    const totalseconds = hour * 3600 + minute * 60 + second;
    const totalsecondsoutofday = totalseconds / 86400;
    const totaldegrees = totalsecondsoutofday * 360;
    /*const size = Math.min(
      window.innerHeight * 0.059,
      window.innerWidth * 0.059
    );*/
    //const width = size;
    //const height = size;
    //const x = width / 2;
    //const y = height / 2;
    const outerRadius =
      this.props.smallplz && this.props.height < 100
        ? Math.min(window.innerHeight * 0.045, 20)
        : this.props.smallplz
        ? Math.min(window.innerHeight * 0.045, 20) * 0.5
        : Math.min(window.innerHeight * 0.045, 20);
    const innerRadius =
      this.props.smallplz && this.props.height < 100
        ? Math.min(window.innerHeight * 0.045, 20)
        : this.props.smallplz
        ? Math.min(window.innerHeight * 0.04, 20) * 0.5
        : Math.min(window.innerHeight * 0.04, 20);
    const arcGenerato2 = d3.shape
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(0)
      .endAngle(
        ((this.props.datecelestial.getHours() / 24) * 360 * Math.PI) / 180 +
          ((this.props.datecelestial.getMinutes() / 60) *
            (360 / 24) *
            Math.PI) /
            180
      );
    return (
      <div
        ref={this.myInput}
        className={
          this.props.smallplz && this.props.height < 100
            ? "containplanscal"
            : this.props.smallplz
            ? "containplanscaltop"
            : "containplanscal"
        }
      >
        {/*this.state.prevNotes !== this.props.notes && (
                <PlanArcs notes={this.props.notes} />
              )*/}

        {this.props.isToday ? (
          hour === 20 ||
          hour === 21 ||
          hour === 22 ||
          hour === 23 ||
          hour === 0 ||
          hour === 1 ||
          hour === 2 ||
          hour === 3 ||
          hour === 4 ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/tqw39uh4mcywirx/clockbordermoonmenu%20%288%29.png?dl=0"
              className={
                this.props.smallplz && this.props.height < 100
                  ? "clockbordercal"
                  : this.props.smallplz
                  ? "clockbordercaltop"
                  : "clockbordercal"
              }
              style={{
                transform: `rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          ) : (
            <img
              src="https://www.dl.dropboxusercontent.com/s/qzhthnzeem82h2s/download%20%284%29.png?dl=0"
              className={
                this.props.smallplz && this.props.height < 100
                  ? "clockbordercal"
                  : this.props.smallplz
                  ? "clockbordercaltop"
                  : "clockbordercal"
              }
              style={{
                transform: `rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          )
        ) : null}
        {this.myInput.current && (
          <Surface
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: "rotate(180deg)"
            }}
            width={this.myInput.current.offsetHeight}
            height={this.myInput.current.offsetHeight}
          >
            <Group //x={"100%"} y={"100%"}
              x={this.myInput.current.offsetHeight / 2}
              y={this.myInput.current.offsetHeight / 2}
            >
              {/*new Date(date).getTime() < new Date().getTime() && inMonth && (
                  <Shape
                    key={_date}
                    d={arcGenerato1()}
                    stroke={"rgb(0,0,0)"}
                    fill={"rgba(28,124,132,.4)"}
                  />
                )*/}
              <Shape
                style={{
                  display: "flex",
                  position: "absolute"
                }}
                key={_datezero}
                d={arcGenerato2()}
                stroke={"rgb(28,124,132)"}
                fill={"rgb(28,124,132, .4)"}
              />
            </Group>
          </Surface>
        )}
      </div>
    );
  }
}
export default TodaySun;
