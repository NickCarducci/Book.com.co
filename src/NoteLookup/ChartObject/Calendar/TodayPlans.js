import React from "react";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";
const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

class TodayPlans extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  render() {
    var _datezero = this.props._date;
    _datezero.setHours(0, 0, 0, 0);
    /*
    const size = Math.min(
      window.innerHeight * 0.059,
      window.innerWidth * 0.059
    );*/
    const outerRadius = this.props.smallplz
      ? Math.min(window.innerHeight * 0.045, 20) * 0.5
      : Math.min(window.innerHeight * 0.045, 20);
    const innerRadius = this.props.smallplz
      ? Math.min(window.innerHeight * 0.04, 20) * 0.5
      : Math.min(window.innerHeight * 0.04, 20);
    return (
      <div ref={this.myInput} className={"containplanscal"}>
        {this.myInput.current && (
          <Surface
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: "rotate(180deg)"
            }}
            width={this.props.height}
            height={this.props.height}
          >
            <Group //x={"100%"} y={"100%"}
              x={this.props.height / 2}
              y={this.props.height / 2}
            >
              {this.props.thePlans.map((plan, index) => {
                var plandate = new Date(plan);
                var plandate1 = new Date(plan);
                plandate.setHours(0, 0, 0, 0);
                var startAngleRad1 =
                  ((plandate1.getHours() / 24) * 360 * Math.PI) / 180 +
                  ((plandate1.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
                const timespan =
                  ((plan.rangeChosen / 24) * 360 * Math.PI) / 180;
                const endAngleRad1 =
                  startAngleRad1 + (plan.rangeChosen ? timespan : 0.25);
                const arcGenerato = d3.shape
                  .arc()
                  .outerRadius(outerRadius)
                  .innerRadius(innerRadius)
                  .startAngle(Number(startAngleRad1.toFixed(5)))
                  .endAngle(Number(endAngleRad1.toFixed(5)));
                if (
                  _datezero.getTime() === plandate.getTime() &&
                  (this.props.plansShowing || !this.props.inviteInitial)
                ) {
                  return (
                    <Shape
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        position: "absolute"
                      }}
                      key={plan._id + "note"}
                      d={arcGenerato()}
                      stroke={"rgb(49,212,212)"}
                      strokeWidth="1"
                      fill={"rgba(49,212,212, .6)"}
                    />
                  );
                } else return null;
              })}
            </Group>
          </Surface>
        )}
      </div>
    );
  }
}
export default TodayPlans;
