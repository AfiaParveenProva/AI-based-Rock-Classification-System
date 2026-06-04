import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Chip,
  Box,
} from "@material-ui/core";

import rockLogo from "./rock-logo.png";
import bgImage from "./rock-bg.jpg";

import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";
import LandscapeIcon from "@material-ui/icons/Landscape";
import InfoIcon from "@material-ui/icons/Info";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },

  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },

  media: {
    height: 400,
    objectFit: "contain",
  },

  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },

  mainContainer: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    marginTop: "8px",
  },

  imageCard: {
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "15px",
  },

  tableCell: {
    fontSize: "22px",
    color: "#2c3e50",
    fontWeight: "bolder",
  },

  tableCell1: {
    fontSize: "16px",
    color: "#7f8c8d",
    fontWeight: "bolder",
  },

  appbar: {
    background: "#2c3e50",
    color: "white",
  },

  loader: {
    color: "#e67e22",
  },

  rockChip: {
    margin: "4px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    fontSize: "12px", 
    borderRadius: "20px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
  },

  confidenceBar: {
    width: "100%",
    height: "10px",
    background: "#ecf0f1",
    borderRadius: "5px",
    marginTop: "10px",
    overflow: "hidden",
  },

  confidenceFill: {
    height: "100%",
    background: "linear-gradient(90deg,#e67e22,#f39c12)",
  },
}));


const rockInfo = {
  Basalt: {
    emoji: "🌋",
    description:
      "A fine-grained volcanic rock formed from rapid cooling of lava.",
    hardness: "5-6",
    composition: "Plagioclase, Pyroxene",
  },
  Chert: {
    emoji: "🪨",
    description: "Hard sedimentary rock made of microcrystalline quartz.",
    hardness: "7",
    composition: "Silicon dioxide",
  },
  Clay: {
    emoji: "🏺",
    description: "Fine-grained natural rock or soil material containing clay minerals.",
    hardness: "1-2",
    composition: "Hydrous aluminum silicates",
  },
  Gypsum: {
    emoji: "💎",
    description: "Soft sulfate mineral composed of calcium sulfate dihydrate used in plaster and fertilizer.",
    hardness: "2",
    composition: "Calcium sulfate",
  },
  "Olivine-basalt": {
    emoji: "🔮",
    description: "Basalt rich in olivine crystals. Common in volcanic regions and mantle-derived magmas.",
    hardness: "5-6",
    composition: "Olivine, plagioclase",
  },
};


export const RockClassifier = () => {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL || "http://localhost:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setData(res.data);
    } catch (err) {
      console.error("Error sending file:", err);
      alert("Error classifying image. Please check backend.");
    }

    setIsLoading(false);
  };

  const onSelectFile = (files) => {
    if (!files.length) return;

    const file = files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setData(null);
    sendFile(file);
  };

  const clearData = () => {
    setSelectedFile(null);
    setPreview(null);
    setData(null);
  };

  let confidence = data
    ? (parseFloat(data.confidence) * 100).toFixed(2) : 0;

  const rock = data ? rockInfo[data.class] : null;


  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <LandscapeIcon style={{ marginRight: 10 }} />
          <Typography variant="h6">Rock Classification System</Typography>
          <div className={classes.grow} />
          <Avatar src={rockLogo} />
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} className={classes.mainContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} md={6}>
            <Card className={classes.imageCard}>
              {!preview && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Upload a rock image"}
                    onChange={onSelectFile}
                    filesLimit={1}
                  />

                  <Box mt={2}>
                    {Object.keys(rockInfo).map((r) => (
                      <Chip
                        key={r}
                        label={`${rockInfo[r].emoji} ${r}`}
                        className={classes.rockChip}
                      />
                    ))}
                  </Box>
                </CardContent>
              )}

              {preview && (
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={preview}
                    className={classes.media}
                  />
                </CardActionArea>
              )}

              {isLoading && (
                <CardContent>
                  <CircularProgress className={classes.loader} />
                  <Typography>Analyzing rock...</Typography>
                </CardContent>
              )}

              {data && (
                <CardContent>
                  <Typography variant="h5">
                    {rock.emoji} {data.class}
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Property</TableCell>
                          <TableCell align="right">Value</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell>Confidence</TableCell>
                          <TableCell align="right">
                            {confidence}%
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Hardness</TableCell>
                          <TableCell align="right">
                            {rock.hardness}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Composition</TableCell>
                          <TableCell align="right">
                            {rock.composition}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography style={{ marginTop: 15 }}>
                    {rock.description}
                  </Typography>

                  <div className={classes.confidenceBar}>
                    <div
                      className={classes.confidenceFill}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>

                  <ColorButton
                    style={{ marginTop: 20 }}
                    onClick={clearData}
                    startIcon={<Clear />}
                  >
                    Classify Another Rock
                  </ColorButton>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

