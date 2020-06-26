import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemePallete from './palette/themePalette';
import {
  PieChart,
  Pie,
  Sector
} from 'recharts';



const theme = createMuiTheme(ThemePallete.greenTheme);
const color = ({
  primary: theme.palette.primary.main,
  secondary: theme.palette.secondary.main,
});

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + ((outerRadius + 10) * cos);
  const sy = cy + ((outerRadius + 10) * sin);
  const mx = cx + ((outerRadius + 30) * cos);
  const my = cy + ((outerRadius + 30) * sin);
  const ex = mx + ((cos >= 0 ? 1 : -1) * 22);
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} textAnchor={textAnchor} fill="#333">{` ${value} actions`}</text>
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Pourcentage ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  payload: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
};

renderActiveShape.defaultProps = {
  cx: 0,
  cy: 0,
  midAngle: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  fill: '#eee',
  payload: '',
  percent: 0,
  value: 0,
};

class PieCustomShape extends React.Component {
  state = {
    activeIndex: 0
  };

  onPieEnter(evt,data) {
    const index = data.findIndex(p => p.name === evt.name);
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const {capitalRepData, fillcolor} = this.props;
    const { activeIndex } = this.state;
    return (
      <PieChart
        width={600}
        height={400}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <Pie
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={capitalRepData}
          cx={250}
          cy={180}
          innerRadius={60}
          outerRadius={100}
          fill={fillcolor === "primary" ? color.primary : color.secondary}
          fillOpacity="0.8"
          onMouseEnter={(event) => this.onPieEnter(event,capitalRepData)}
        />
      </PieChart>
    );
  }
}

export default PieCustomShape;
