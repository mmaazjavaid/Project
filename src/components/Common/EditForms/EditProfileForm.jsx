import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { List } from "@mui/material";
import { updateRequest } from "../../../state/ducks/users/userSLice";
import { customTheme } from "./FormTheme";

function EditProfileForm({ type, open, setEditForm }) {
  const outerTheme = useTheme();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [inputs, setInputs] = useState(user.data);
  const [experienceInput, setExperienceInput] = useState({
    title: null,
    summary: null,
  });
  const [skillInput, setSkillInput] = useState("");
  useEffect(() => {
    setInputs(user.data);
  }, [user]);
  const handleCloseForm = () => {
    setExperienceInput({ title: null, summary: null });
    setEditForm((prevEditForm) => ({
      ...prevEditForm,
      open: false,
    }));
  };
  const handleSaveForm = (formType = "general", DataIndex = null) => {
    let data = {};
    if (formType === "addExperience") {
      data = { ...inputs, experience: [...inputs.experience, experienceInput] };
    } else if (formType === "updateExperience") {
      const updatedExperiences = inputs.experience.map((experience, index) => {
        return experienceInput.index === index
          ? { title: experienceInput.title, summary: experienceInput.summary }
          : experience;
      });
      data = { ...inputs, experience: [...updatedExperiences] };
    } else if (formType === "deleteExperience") {
      const updatedExperiences = inputs.experience.filter(
        (experience, index) => DataIndex !== index
      );
      data = { ...inputs, experience: [...updatedExperiences] };
    } else {
      data = { ...inputs };
    }
    handleCloseForm();
    dispatch(updateRequest(data));
  };

  const handleSaveSkill = (e, formType) => {
    e.preventDefault();
    let data = {};
    if (formType === "addSkill") data = { ...inputs, skills: [...inputs.skills, skillInput] };
    setSkillInput("");
    dispatch(updateRequest(data));
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
                <form onSubmit={(e) => handleSaveSkill(e, "addSkill")}>
                  <TextField
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    margin="dense"
                    id="skill"
                    label="Skill"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseForm()}>Close</Button>
              </DialogActions>
            </>
          )}

          {type === "experienceInfo" && (
            <>
              <DialogTitle>Experience Information</DialogTitle>
              {(inputs.experience.length < 4 ||
                experienceInput?.index === 0 ||
                experienceInput?.index) && (
                <>
                  <DialogContent>
                    <TextField
                      focused={experienceInput?.title}
                      margin="dense"
                      id="title"
                      label="Title"
                      value={experienceInput?.title}
                      onChange={(e) =>
                        setExperienceInput((prevExperienceInputs) => ({
                          ...prevExperienceInputs,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      focused={experienceInput?.summary}
                      margin="dense"
                      id="summary"
                      value={experienceInput?.summary}
                      onChange={(e) =>
                        setExperienceInput((prevExperienceInputs) => ({
                          ...prevExperienceInputs,
                          [e.target.id]: e.target.value,
                        }))
                      }
                      label="Summary"
                      type="text"
                      fullWidth
                      variant="standard"
                      multiline
                      maxRows={4}
                    />
                  </DialogContent>
                  <DialogActions>
                    {experienceInput?.index === 0 || experienceInput?.index ? (
                      <Button
                        sx={{ marginRight: 2 }}
                        onClick={() => {
                          handleSaveForm("updateExperience");
                        }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        sx={{ marginRight: 2 }}
                        onClick={() => {
                          handleSaveForm("addExperience");
                        }}
                      >
                        Add
                      </Button>
                    )}
                    <Button
                      sx={{ marginRight: 2 }}
                      onClick={() => {
                        handleCloseForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </>
              )}
              <List style={{ maxHeight: "300px", maxWidth: "100%", overflowY: "scroll" }}>
                {inputs?.experience?.map((experience, index) => (
                  <Card
                    sx={{
                      maxWidth: 385,
                      margin: "20px 20px 20px 20px",
                      border: "2px solid lightblue",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {experience?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {experience?.summary}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => setExperienceInput({ ...experience, index })}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleSaveForm("deleteExperience", index);
                        }}
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </List>
            </>
          )}
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default EditProfileForm;
