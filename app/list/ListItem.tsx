import withIntersectionObserver, {
  WithIntersectionObserverProps,
} from "@/app/list/Intersaction";

interface ListItemProps extends WithIntersectionObserverProps {
  name: number;
}

const ListItem = (props: ListItemProps) => {
  const { isVisible, componentHeight, name } = props;

  if (!isVisible) {
    return <></>;
  }

  return (
    <div style={{ height: name }}>
      <p>This is the dynamic height component content.</p>
      <p>Is visible: {isVisible.toString()}</p>
      <p>Component height: {componentHeight}px</p>
    </div>
  );
};

export default withIntersectionObserver(ListItem);
