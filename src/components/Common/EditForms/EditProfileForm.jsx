import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateRequest } from "../../../state/ducks/users/userSLice";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

function EditProfileForm({ type, open, setEditForm }) {
  const outerTheme = useTheme();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [inputs, setInputs] = useState(user.data);
  useEffect(() => {
    setInputs(user.data);
  }, [user]);
  const handleCloseForm = () => {
    setEditForm((prevEditForm) => ({
      ...prevEditForm,
      open: false,
    }));
  };
  const handleSaveForm = () => {
    handleCloseForm();
    dispatch(updateRequest(inputs));
  };
  return (
    <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Dialog
          open={open}
          onClose={() => setEditForm((prevEditForm) => ({ ...prevEditForm, open: false }))}
        >
          {type === "basicInfo" && (
            <>
              <DialogTitle>Edit Basic Information</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  value={inputs?.name}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, [e.target.id]: e.target.value }))
                  }
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogContent>
                <TextField
                  margin="dense"
                  value={inputs?.location}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, [e.target.id]: e.target.value }))
                  }
                  id="location"
                  label="Location"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseForm()}>Cancel</Button>
                <Button onClick={() => handleSaveForm()}>Save Changes</Button>
              </DialogActions>
            </>
          )}

          {type === "profileInfo" && (
            <>
              <DialogTitle>Edit Profile Information</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  value={inputs?.title}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, [e.target.id]: e.target.value }))
                  }
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogContent>
                <TextField
                  margin="dense"
                  value={inputs?.per_hour}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, [e.target.id]: e.target.value }))
                  }
                  id="per_hour"
                  label="Per Hour Rate"
                  type="number"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogContent>
                <TextField
                  margin="dense"
                  value={inputs?.description}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, [e.target.id]: e.target.value }))
                  }
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={4}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseForm()}>Cancel</Button>
                <Button onClick={() => handleSaveForm()}>Save Changes</Button>
              </DialogActions>
            </>
          )}

          {type === "skillsInfo" && (
            <>
              <DialogTitle>Add Skills (Press Enter to add skill)</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="skill"
                  label="Skill"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    setEditForm((prevEditForm) => ({
                      ...prevEditForm,
                      open: false,
                    }))
                  }
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    setEditForm((prevEditForm) => ({
                      ...prevEditForm,
                      open: false,
                    }))
                  }
                >
                  Save Changes
                </Button>
              </DialogActions>
            </>
          )}

          {type === "experienceInfo" && (
            <>
              <DialogTitle>Experience Information</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="experienceTitle"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="experienceSummary"
                  label="Summary"
                  type="text"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={4}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    setEditForm((prevEditForm) => ({
                      ...prevEditForm,
                      open: false,
                    }))
                  }
                >
                  Add
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default EditProfileForm;
