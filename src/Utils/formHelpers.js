import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";

import TripOriginIcon from "@material-ui/icons/TripOrigin";
import PhotoIcon from "@material-ui/icons/Photo";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from "@material-ui/icons/Delete";

import { ColorPicker } from "material-ui-color";

import { v4 as uuid } from "uuid";

function renderTextFieldWithAbornment({
  name,
  onChange,
  labelEL,
  labelEN,
  value,
  abornment,
  language,
  error,
  errorMessage,
  className,
  helperTextEL,
  helperTextEN,
  multiline,
  variant,
  isNumberInput,
  placeholderEL,
  placeholderEN,
} = {}) {
  const number = isNumberInput === true ? { type: "number" } : {};

  return (
    <TextField
      variant={variant}
      name={name}
      onChange={onChange}
      label={language === "EL" ? labelEL : labelEN}
      value={value}
      error={error}
      className={className}
      helperText={
        error ? errorMessage : language === "EL" ? helperTextEL : helperTextEN
      }
      placeholder={language === "EL" ? placeholderEL : placeholderEN}
      multiline={multiline}
      rows={5}
      rowsMax={5}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{abornment}</InputAdornment>
        ),
        inputProps: number,
      }}
    />
  );
}

function renderTextField({
  name,
  onChange,
  labelEL,
  labelEN,
  value,
  language,
  error,
  className,
  helperTextEL,
  helperTextEN,
  errorMessage,
  isNumberInput,
} = {}) {
  const number = isNumberInput === true ? { type: "number" } : {};
  return (
    <TextField
      name={name}
      onChange={onChange}
      label={language === "EL" ? labelEL : labelEN}
      value={value}
      error={error}
      className={className}
      helperText={
        error ? errorMessage : language === "EL" ? helperTextEL : helperTextEN
      }
      InputProps={{
        inputProps: number,
      }}
    />
  );
}

function renderList({ options, language, onDelete, className = "" } = {}) {
  return (
    <List className={className}>
      {renderListItems(options, language, onDelete)}
    </List>
  );
}

function renderListItems(optionsArray, language, onDelete) {
  return optionsArray.map((val, idx) => {
    return (
      <ListItem key={idx}>
        <ListItemAvatar>
          <Avatar>
            <TripOriginIcon style={{ color: "#26547c" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={language === "EL" ? val.optionTextEL : val.optionTextEN}
          secondary={language === "EL" ? val.optionTextEN : val.optionTextEL}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              onDelete(val.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
}

function renderSelect({
  language,
  formClassName,
  labelEL,
  labelEN,
  name,
  value,
  onChange,
  options,
  variant,
  error,
  errorMessage,
} = {}) {
  return (
    <FormControl className={formClassName} error={error}>
      <InputLabel id="label">
        {language === "EL" ? labelEL : labelEN}
      </InputLabel>
      <Select
        labelId="label"
        name={name}
        value={value}
        onChange={onChange}
        variant={variant}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option.value} style={option.style} key={uuid()}>
              {language === "EL" ? option.textEL : option.textEN}
            </MenuItem>
          );
        })}
      </Select>
      {errorMessage === "" ? null : (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

function renderImageUpload({
  language,
  labelEL,
  labelEN,
  image,
  name,
  onChange,
  error,
  errorContent,
} = {}) {
  return (
    <div className="flex">
      <InputLabel
        style={error ? { width: "20%", color: "#f21d3c" } : { width: "20%" }}
      >
        {language === "EL" ? labelEL : labelEN}
        {error ? <br /> : null}
        {error ? <span className="action-error">{errorContent}</span> : null}
      </InputLabel>
      {image === null ? (
        <Avatar>
          <PhotoIcon />
        </Avatar>
      ) : (
        <Avatar src={URL.createObjectURL(image)} />
      )}
      <Tooltip
        arrow
        title={language === "EL" ? "Προσθήκη Εικόνας" : "Add Image"}
      >
        <IconButton
          variant="contained"
          style={error ? { color: "#f21d3c" } : {}}
          color="primary"
          component="label"
        >
          <AddPhotoAlternateIcon />
          <input
            type="file"
            accept=".png, .gif, .jpg"
            hidden
            name={name}
            onChange={onChange}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
}

function renderColorPicker({
  className,
  language,
  labelEL,
  labelEN,
  deferred,
  value,
  onChange,
  error,
  errorMessage,
} = {}) {
  return (
    <div className={className}>
      <InputLabel
        style={error ? { width: "50%", color: "#f21d3c" } : { width: "50%" }}
      >
        {language === "EL" ? labelEL : labelEN}
        {error ? <br /> : null}
        {error ? <span className="action-error">{errorMessage}</span> : null}
      </InputLabel>
      <ColorPicker
        deferred={deferred}
        hideTextfield={true}
        disableAlpha
        inputFormats={["hex"]}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function renderSwich({
  className,
  labelEL,
  labelEN,
  language,
  name,
  value,
  color,
  onChange,
  error,
  errorMessage,
} = {}) {
  return (
    <div className={className}>
      <InputLabel
        style={error ? { width: "50%", color: "#f21d3c" } : { width: "50%" }}
      >
        {language === "EL" ? labelEL : labelEN}
        {error ? <br /> : null}
        {error ? <span className="action-error">{errorMessage}</span> : null}
      </InputLabel>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item> {language === "EL" ? "Όχι" : "Νο"}</Grid>
          <Grid item>
            <Switch
              checked={value}
              onChange={onChange}
              name={name}
              color={error ? "secondary" : "primary"}
            />
          </Grid>
          <Grid item>{language === "EL" ? "Ναι" : "Yes"}</Grid>
        </Grid>
      </Typography>
    </div>
  );
}

export {
  renderList,
  renderTextFieldWithAbornment,
  renderTextField,
  renderSelect,
  renderImageUpload,
  renderColorPicker,
  renderSwich,
};
