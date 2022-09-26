import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CardWithLabel = (props: any) => {
  const { title, children } = props;

  return (
    <Card sx={{ display: "flex", width: "100%", marginBottom: "16px" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%", boxShadow: "none" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardWithLabel;
