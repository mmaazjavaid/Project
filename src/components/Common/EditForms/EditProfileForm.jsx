import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

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
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
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
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

function EditProfileForm({ type, open, setEditForm }) {
  const outerTheme = useTheme();

  return (
    <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Dialog
          open={open}
          onClose={() =>
            setEditForm((prevEditForm) => ({ ...prevEditForm, open: false }))
          }
        >
          {type === "basicInfo" && (
            <>
              <DialogTitle>Edit Basic Information</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
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
                  id="location"
                  label="Location"
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

          {type === "profileInfo" && (
            <>
              <DialogTitle>Edit Profile Information</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="profileTitle"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="perHourRate"
                  label="Per Hour Rate"
                  type="number"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="profileDescription"
                  label="Description"
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
