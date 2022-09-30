import React from "react";
import cn from "classnames";

import styles from "./TableItemHead.module.css";

interface IProps {
  isIndicatorDown: boolean;
}

const Indicator = ({ isIndicatorDown }: IProps) => {
  return (
    <div
      className={cn(
        styles.indicator,
        isIndicatorDown ? styles.indicator__down : styles.indicator__up
      )}
    ></div>
  );
};

export default Indicator;
