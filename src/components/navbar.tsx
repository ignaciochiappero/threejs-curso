const ELEMENTOS = [
  { id: "1", name: "ex1" },
  { id: "2", name: "ex2" },
  { id: "3", name: "ex3" },
];

const Navbar = () => {
  return (
    <div>
      {ELEMENTOS.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Navbar;
