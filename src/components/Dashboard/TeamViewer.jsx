import React, { useState, useEffect } from "react";
import { List, ListItemAvatar, ListItem, ListItemText, Chip, Divider, Container, Grid, Avatar, Typography, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import Section from "./Section";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function UserItem(props){
    return(
        <ListItem>
            <ListItemAvatar>
                <Avatar style={{ "width": "2.5em", "height": "2.5em" }}>
                    {props.name.substring(0,1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.skills} />
        </ListItem>
    )
}
function MyTeam(){
    return(
        <Grid container direction="row" justify="space-between">
            <Grid container direction="column" xs={6}>
                <div style={{width: "100%", maxWidth: 360}}>
                    <div>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5">
                                    My Team
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography color="textSecondary" variant="body2">
                            hi, we are a team of five and plan on creating a web app. we are looking for someone who knows python and flask
                        </Typography>
                    </div>
                    <Divider variant="middle" />
                    <div style={{marginTop: "0.5em", marginBottom: "0.5em"}}>
                        <Typography gutterBottom variant="body1">
                            Skills
                        </Typography>
                        <div>
                            <Chip label="Python" />
                            <Chip label="Flask" />
                        </div>
                    </div>
                    <Divider variant="middle" />

                    <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Typography gutterBottom variant="body1">
                            Prizes
                        </Typography>
                        <div>
                            <Chip label="prize9" />
                            <Chip label="prize8" />
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid container direction="column" xs={6}>
                <List style={{ width: "100%", maxWidth: 360 }}>
                    <UserItem name="Example example" skills="python"/>
                    <UserItem name="User example" skills="python, flask" />
                    <UserItem name="L example" skills="frontend" />
                </List>
            </Grid>
        </Grid>
    )

}
function ManageTeam(){
    return (
        <Grid container direction="row">
            <Grid item ocntainer direction="column">
                S
            </Grid>
        </Grid>
    )
}
const TeamViewer = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
        <Container maxWidth={false} 
            style={{paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section title="Team"
                        subtitle="Introduce yourself, don't be shy!"
                        color="yellow"
                        isOpen={true}>
                            <Grid container direction="column" alignItems="center">
                                <Grid container direction="row" justify="center">
                                    <Grid item style={{"margin-right": "2em"}}>
                                        <Avatar style={{"width": "6em", "height": "6em"}}>E</Avatar>
                                    </Grid>
                                    <Grid item direction="column">
                                        <Grid item>
                                            <Typography variant="h5">Example Example</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Bio</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Skills:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Interests:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Prizes:</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{marginTop: "2em"}}>
                                    <AppBar position="static" color="transparent" style={{ background: 'transparent', boxShadow: 'none'}}>
                                        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="simple tabs example">
                                            <Tab label="My Team" {...a11yProps(0)} />
                                            <Tab label="Manage Team" {...a11yProps(1)} />
                                        </Tabs>
                                    </AppBar>

                                </Grid>
                                
                            </Grid>
                        <Grid container>
                            {
                                value == 0 ? <MyTeam /> : <ManageTeam />
                            }
                        </Grid>
                    </Section>
                </Grid>
            </Grid>
        </Container>

    )
}

export default TeamViewer;
