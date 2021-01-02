import React, { Children, forwardRef, Fragment, useEffect, useState } from "react";
import CONFIG from "web.config";

const ListItemSize = {
  get AUTO() {
    return "auto";
  }, // default
  get STRETCH() {
    return "stretch";
  },
};

const VerticalListAlign = {
  get LEFT() {
    return "left";
  }, // default
  get CENTER() {
    return "center";
  },
  get RIGHT() {
    return "right";
  },
};

const HorizontalListAlign = {
  get TOP() {
    return "top";
  }, // default
  get MIDDLE() {
    return "middle";
  },
  get BOTTOM() {
    return "bottom";
  },
};

const ListType = {
  get STRETCH() {
    return "stretch";
  }, // default
  get SPACE_BETWEEN() {
    return "space_between";
  },
  get SPACE_AROUND() {
    return "space_around";
  },
  get START() {
    return "start";
  },
  get CENTER() {
    return "center";
  },
  get END() {
    return "end";
  },
};

/**
 * @param  {Object} props
 * @param  {String} [props.key]
 * @param  {('auto'|'stretch')} [props.size="auto"]
 * @param  {String} props.background
 * @param  {String} props.padding
 * @param  {String} props.margin
 * @param  {String} props.border
 * @param  {String} props.borderRadius
 * @param  {React.CSSProperties} props.style
 * @param  {String} [props.className=""]
 */
const ListItem = ({
  key,
  children,
  size,
  background,
  padding,
  margin,
  border,
  borderRadius,
  style,
  className = "",
  ...rest
}) => {
  let flexValue = "initial";
  // console.log('size', size)
  if (typeof size != "undefined") {
    switch (size) {
      case ListItemSize.STRETCH:
        flexValue = "1";
        break;
      case ListItemSize.AUTO:
        flexValue = "auto";
        break;
      default:
        flexValue = size;
        break;
    }
  }

  return (
    <>
      <style jsx>{`
        .list-item {
          position: relative;
          ${padding ? `padding: ${padding};` : ""}
          ${margin ? `margin: ${margin};` : ""}
          ${background ? `background: ${background};` : ""}
          ${border ? `border: ${border};` : ""}
          ${borderRadius ? `border-radius: ${borderRadius};` : ""}
        }
      `}</style>
      <div
        className={`list-item ${className ? className : ""}`}
        key={key}
        style={{ flex: flexValue, ...style }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

/**
 * @typedef  {Object} HorizontalListProps
 * @property  {String} [className=""]
 * @property  {String} [key]
 * @property  {Number} [gutter=0]
 * @property  {('start'|'center'|'end'|'space_between'|'space_around')} [type="start"]
 * @property  {('auto'|'stretch')} [itemSize]
 * @property  {String} [wrap]
 * @property  {('top'|'middle'|'bottom'|'stretch')} [align="top"]
 * @property  {Boolean} [scrollable=true]
 * @property  {Boolean} [reverse=false]
 * @property  {React.CSSProperties} [style]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<HorizontalListProps>}
 */
const HorizontalList = forwardRef(
  (
    {
      children,
      className = "",
      type = "start",
      itemSize,
      wrap = false,
      align = "top",
      gutter = 0,
      scrollable = true,
      reverse = false,
      // containerRef,
      ...rest
    },
    ref
  ) => {
    const wrapContent = wrap == true ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

    let justifyContent = "";
    switch (type) {
      case ListType.SPACE_BETWEEN:
        justifyContent = "justify-content: space-between;";
        break;
      case ListType.SPACE_AROUND:
        justifyContent = "justify-content: space-around;";
        break;
      case ListType.CENTER:
        justifyContent = "justify-content: center;";
        break;
      case ListType.END:
        justifyContent = "justify-content: flex-end;";
        break;
      default:
        // START
        justifyContent = "justify-content: flex-start;";
        break;
    }

    let alignConfig = "";
    switch (align) {
      case "top":
        alignConfig = "align-items: start;";
        break;
      case "middle":
        alignConfig = "align-items: center;";
        break;
      case "bottom":
        alignConfig = "align-items: end;";
        break;
      case "stretch":
        alignConfig = "align-items: stretch;";
        break;
      default:
        console.warn(`HorizontalListAlign of "${align}" is not valid.`);
        break;
    }

    const scrollConfig = scrollable ? `overflow-x: auto;` : "";

    const orgChildren = children && children.type == Fragment ? children.props.children : children;
    const childrenWithProps = Children.map(orgChildren, (child, index) => {
      if (React.isValidElement(child)) {
        let newProps = { ...child.props };
        // console.log("orgChildren.length", orgChildren.length);
        const gutterStyle =
          orgChildren.hasOwnProperty("length") && index != orgChildren.length - 1 ? { marginRight: `${gutter}px` } : {};

        if (newProps.style) {
          newProps.style = { ...gutterStyle, ...newProps.style };
        } else {
          newProps.style = gutterStyle;
        }

        if (child.type == ListItem) {
          // console.log('newProps.size', newProps.size)
          newProps.size = itemSize ? itemSize : newProps.size;
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });

    return (
      <>
        <style jsx>{`
          .layout-list {
            display: flex;
            position: relative;
            flex-direction: row;
            ${scrollConfig}
            ${justifyContent}
          ${wrapContent}
          ${alignConfig}
          ${reverse ? "flex-flow: row-reverse;" : ""}
          }
        `}</style>
        <div className={`layout-list ${className}`} {...rest} ref={ref}>
          {childrenWithProps}
        </div>
      </>
    );
  }
);

function VerticalList({
  children,
  type = "start",
  itemSize,
  wrap,
  align,
  gutter = 0,
  scrollable = true,
  style,
  ...rest
}) {
  const [newChildren, setNewChildren] = useState([]);
  const wrapContent = wrap ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

  let alignConfig = "";
  if (typeof align !== "undefined") {
    switch (align) {
      case VerticalListAlign.LEFT:
        alignConfig = "align-items: flex-start;";
        break;
      case VerticalListAlign.CENTER:
        alignConfig = "align-items: center;";
        break;
      case VerticalListAlign.RIGHT:
        alignConfig = "align-items: flex-end;";
        break;
      default:
        console.warn(`VerticalListAlign of "${align}" is not valid.`);
        break;
    }
  }

  let justifyContent = "";
  switch (type) {
    case ListType.SPACE_BETWEEN:
      justifyContent = "justify-content: space-between;";
      break;
    case ListType.SPACE_AROUND:
      justifyContent = "justify-content: space-around;";
      break;
    case ListType.CENTER:
      justifyContent = "justify-content: center;";
      break;
    case ListType.END:
      justifyContent = "justify-content: flex-end;";
      break;
    default:
      // START
      justifyContent = "justify-content: flex-start;";
      break;
  }

  const scrollConfig = scrollable ? `overflow-y: auto;` : "";

  useEffect(() => {
    // console.log("rerender vertical list");
    const orgChildren = children && children.type == Fragment ? children.props.children : children;
    const childrenWithProps = Children.map(orgChildren, (child, index) => {
      if (React.isValidElement(child)) {
        let newProps = { ...child.props };

        const gutterStyle =
          orgChildren.hasOwnProperty("length") && index != orgChildren.length - 1
            ? { marginBottom: `${gutter}px` }
            : {};

        if (newProps.style) {
          newProps.style = { ...gutterStyle, ...newProps.style };
        } else {
          newProps.style = { ...gutterStyle };
        }

        if (child.type == ListItem) {
          newProps.size = itemSize ? itemSize : newProps.size;
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });

    setNewChildren(childrenWithProps);
  }, [children, gutter]);

  return (
    <>
      <style jsx>{`
        .layout-list {
          display: flex;
          flex-direction: column;
          ${wrapContent}
          ${alignConfig}
          ${scrollConfig}
          ${justifyContent}
        }
      `}</style>
      <div className="layout-list" style={style} {...rest}>
        {newChildren}
      </div>
    </>
  );
}

function GridList({ children, className = "", col = 4, gutter = 0, itemAlign = "top" }) {
  const [renderChildren, setRenderChildren] = useState([]);

  useEffect(() => {
    const orgChildren = children && children.type == Fragment ? children.props.children : children;
    const childrenList =
      typeof orgChildren == "undefined" ? [] : typeof orgChildren.length == "undefined" ? [orgChildren] : orgChildren;
    const itemAmount = childrenList.length;
    // console.log("childrenList.length", childrenList.length);
    const rowAmount = Math.ceil(itemAmount / col);
    // console.log("itemAmount", itemAmount);

    let horGutter = !isNaN(gutter) ? gutter : 0;
    let verGutter = !isNaN(gutter) ? gutter : 0;

    if (gutter.length) {
      horGutter = gutter[0];
      verGutter = gutter[1];
    }

    const tmpArr = [];
    for (let i = 0; i < rowAmount; i++) {
      const rowChildren = [];
      for (let k = i * col; k < i * col + col; k++) {
        const isLastItemInRow = k == i * col + col - 1;
        const addedGutter = isLastItemInRow ? "0" : `${horGutter}px`;
        if (childrenList[k]) {
          rowChildren.push(
            <ListItem key={`grid-item-${i}-${k}`} style={{ marginRight: addedGutter }}>
              {childrenList[k]}
            </ListItem>
          );
        } else {
          rowChildren.push(<ListItem key={`grid-item-${i}-${k}`} style={{ marginRight: addedGutter }} />);
        }
      }
      const row = (
        <HorizontalList
          key={`grid-row-${i}`}
          itemSize="stretch"
          align={itemAlign}
          style={{ marginBottom: `${verGutter}px` }}
        >
          {rowChildren}
        </HorizontalList>
      );
      tmpArr.push(row);
    }

    setRenderChildren(tmpArr);
  }, [col, gutter, itemAlign]);

  return <div className={`grid-list ${className}`}>{renderChildren}</div>;
}

export {
  HorizontalList,
  VerticalList,
  GridList,
  ListItem,
  ListItemSize,
  ListType,
  VerticalListAlign,
  HorizontalListAlign,
};
