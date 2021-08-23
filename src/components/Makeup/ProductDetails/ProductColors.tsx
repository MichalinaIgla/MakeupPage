interface ProductDetailsProps {
  color: {
    colour_name: string;
    hex_value: string;
  };
}
const ProductColors: React.FC<ProductDetailsProps> = ({ color }) => {
  return (
    <>
      <span
        className="dot mr-3"
        style={{
          height: '25px',
          width: '25px',
          backgroundColor: color.hex_value,
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '10px',
          marginBottom: '3px'
        }}
      ></span>
      <span>{color.colour_name}</span>
    </>
  );
};

export default ProductColors;
