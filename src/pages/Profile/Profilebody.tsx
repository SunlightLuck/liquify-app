import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { Box, Slider } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import { create } from "ipfs-http-client";
import classnames from "classnames";
import { getFileBuffer } from "../../utils";
import AvatarEditor from "react-avatar-editor";
import Avatar from "react-avatar-edit";
import Modal from "react-modal";
import { StylesContext } from "@material-ui/styles";

const client = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const PrettoSlider = withStyles({
  root: {
    color: "#1C39BB",
    height: 4,
  },
  thumb: {
    height: 22,
    width: 22,
    backgroundColor: "#1C39BB",
    // border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

const Profilebody: React.FC = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [modalIsOpen, setIsOpen] = useState(true);

  const [preview, setPreview] = useState("");
  const [saveCrop, setSaveCrop] = useState(true);
  const [cropValue, setCropValue] = useState(20);

  const avatarEditor = useRef<any>(null);

  const dropHandler = useCallback(async (acceptedFiles: any[]) => {
    console.log(acceptedFiles);
    const [File] = acceptedFiles;
    // const fileName = File.name;
    // setValue('media', File);
    console.log(URL.createObjectURL(File));
    setFile(File);
    // setValue('token_name', fileName);
    fetchUploadImage(File);
  }, []);

  async function fetchUploadImage(file: any) {
    const buffer = await getFileBuffer(file);
    let added = await client.add(buffer);
    const fileUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
    setFileUrl(fileUrl);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setSaveCrop(false);
    setIsOpen(false);
  }

  function onClose() {
    setPreview("");
  }

  function saveImage() {
    setIsOpen(false);
  }

  function onCrop(preview: any) {
    const radius = avatarEditor.current.cropRadius;
    console.log("content", avatarEditor);
    // avatarEditor.current.cropRadius = cropValue;
    // alert(radius);
    setCropValue(radius);
    setPreview(preview);
  }

  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  function handleCropValuechange(event: any, newValue: any) {
    setCropValue(newValue);
  }

  return (
    <Box position="relative" style={{ background: "url('images/map-black.png')" }}>
      <StyledContainer>
        <Box className={classes.oneRow} style={{ justifyContent: "space-between", paddingRight: 0, paddingLeft: 0 }}>
          <Box>
            <Box className={classes.subtitle}>MY PROFILE</Box>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={"19px"}>
          <Box className={classes.profileModal}>
            <Box display={"flex"} justifyContent={"center"} mb={"28px"}>
              <Preview>{fileUrl === "" ? <span>A</span> : <img src={saveCrop ? preview : fileUrl} width="100%" height="100%" alt={fileUrl} />}</Preview>
            </Box>
            <Dropzone maxFiles={1} accept={["image/png", "image/jpeg", "image/gif"]} onDrop={(acceptedFiles) => dropHandler(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <Box display={"flex"} justifyContent={"center"}>
                  <StyledDropZone className={classes.dropZone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Box width={"227px"} className={classnames(classes.addBut)}>
                      Upload profile photo
                    </Box>
                  </StyledDropZone>
                </Box>
              )}
            </Dropzone>
            {fileUrl !== "" && (
              <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <h2 className={classes.profileTitle}>Change profile picture</h2>
                <AvatarBox>
                  <Avatar ref={avatarEditor} width={299} height={299} onCrop={(_preview: any) => onCrop(_preview)} onClose={() => onClose()} onBeforeFileLoad={(elem: any) => onBeforeFileLoad(elem)} src={fileUrl} />
                </AvatarBox>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <img src={"./images/slide_s.png"} alt="" />
                  {/* <PrettoSlider value={cropValue} onChange={handleCropValuechange} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} min={20} max={140} /> */}
                  <img src={"./images/slide_b.png"} alt="" />
                </Box>
                {/* <Slider
                  defaultValue={20}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-custom"
                  step={10}
                  valueLabelDisplay="auto"
                  marks={marks}
                /> */}
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box className={classes.cancelModal} onClick={closeModal}>
                    <span>Cancel</span>
                  </Box>
                  <Box className={classes.saveImage} onClick={saveImage}>
                    <span>Save Image</span>
                  </Box>
                </Box>
              </Modal>
            )}
            <Box display={"flex"} justifyContent={"center"} mt={"31px"}></Box>
            <Box className={classes.inputTitle}>Name</Box>
            <input className={classes.inputBox}></input>
            <Box className={classes.inputTitle}>Email</Box>
            <input className={classes.inputBox}></input>
            <Box className={classes.inputTitle}>Password</Box>
            <input className={classes.inputBox}></input>
            <Box display={"flex"} justifyContent={"center"} mt={"31px"}>
              <Box width={"192px"} className={classes.addBut} onClick={() => setShowModal(!showModal)}>
                Update
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: "absolute";
`;

const Preview = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  /* background : rgba(255, 255, 255, .025); */
  box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 30%);
  max-width: 158px;
  max-height: 158px;

  width: 158px;
  height: 158px;
  background: #dcdee9;
  > img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  > span {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 65px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;

    color: #000000;
  }
`;

const StyledDropZone = styled(Box)`
  cursor: pointer;
  background: #2d2e36;
  /* White */
  border: 1px dashed #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  > img {
    width: 100%;
    height: 100%;
  }
`;

const useStyles = makeStyles((theme) => ({
  oneRow: {
    display: "flex",
    alignItems: "center",
    padding: "15px 15px 0px 15px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "16px 0px",
  },

  profileModal: {
    background: "#FFFFFF",
    boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
    padding: "32px 42px",
    width: "576px",
  },

  inputTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "15px",

    display: "flex",
    alignItems: "center",
    letterSpacing: "-0.015em",

    color: "#4B5563",
  },

  addNewTitle: {
    marginTop: "42px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "15px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "-0.015em",
  },

  inputBox: {
    marginTop: "9px",
    background: "#FFFFFF",
    borderRadius: "6px",
    width: "100%",
    height: "46px",
    filter: "drop-shadow(0px 1px 10px rgba(156, 163, 175, 0.15))",
    border: "none",
    outline: "none",
  },

  addBut: {
    // width: "152px",
    height: "46px",
    background: "#1C39BB",
    borderRadius: "7px",

    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "16px",
    color: "#D9DDE7",

    cursor: "pointer",
  },

  dropZone: {
    width: "227px",
    height: "46px",
  },

  profileTitle: {
    fontFamily: "Dexa Pro",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "22px",

    display: "flex",
    alignItems: "center",
    letterSpacing: "-0.01em",
    color: "#1F2937",
  },

  cancelModal: {
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "20px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.01em",
    width: "122px",
    height: "52px",

    color: "#FFFFFF",

    background: "#6B7280",
    borderRadius: "7px",
    cursor: "pointer",
  },

  saveImage: {
    width: "134px",
    height: "52px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.01em",

    /* Gray colors/White */

    color: "#FFFFFF",

    background: "#1C39BB",
    borderRadius: "7px",
    cursor: "pointer",
  },
}));

const customStyles = {
  content: {
    top: "50%",
    left: "80%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    maxWidth: "343px",
    padding: "22px",
  },
};

const AvatarBox = styled(Box)`
  svg {
    display: none;
  }
`;

export default Profilebody;
