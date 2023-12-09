import ListItem from "@/app/list/ListItem";

const List = () => {
  const increasingArray = Array.from({ length: 100 }, (_, index) => index + 100);

  return (
    <div>
      {increasingArray.map((name) => (
        <ListItem key={name} name={name}></ListItem>
      ))}
    </div>
  );
};

export default List;
