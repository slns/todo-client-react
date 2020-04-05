import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';

import { NewProjectCard } from '../../molecules';
import DeletedConfirmation from '../../atoms/deleted-confirmation';
import Header from '../../organisms/header';


import { axiosInstance } from '../../../sevices/http/http';

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    color: 'black',
    textDecoration: 'none'
  }
});

class selectProjects extends Component {

  constructor(props){
    super(props);
    this.handlerForceUpdate = this.handlerForceUpdate.bind(this);
    this.state = {
      recentProjects: []
    }
  }

  componentDidMount(props) {
          axiosInstance.get('projects')
              .then(response => {

                let projects = response.data.data;
                    this.setState({
                      recentProjects: projects
                    })
              })
              .catch(function (error) {
                //props.history.push("/");
               this.props.history.push("/");
              });  
  }

  handlerForceUpdate() {
   // this.forceUpdate();
    this.componentDidMount();
  }

  render() {
    const {classes} = this.props;
    return (
      
      <React.Fragment>
        <Header/>
        <NewProjectCard action={this.handlerForceUpdate}/>
            <CssBaseline />
        <main>       
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {this.state.recentProjects.map((project) => (
                    <Grid item key={project.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {project.name}
                          </Typography>
                          <Typography>
                            Description
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            <Link to={location => ({...location, pathname:`/tasks/project/${project.id}`})} className={classes.link}>
                              View
                            </Link>
                          </Button>
                          <Button size="small" color="primary">
                            Edit
                          </Button>
                          <DeletedConfirmation
                            action={this.handlerForceUpdate}
                            id={project.id}
                            field="projects" />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>
          </React.Fragment>
    )
  }

}

export default withStyles(styles)(selectProjects);
