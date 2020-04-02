import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

  constructor(){
    super()
    this.state = {
      recentProjects: []
    }
  }

  componentDidMount() {
          axiosInstance.get('projects')
              .then(response => {

                let projects = response.data.data;
                    this.setState({
                      recentProjects: projects
                    })
              })
              .catch(function (error) {
                  console.log('Login  error', error);
              });  
  }

  render() {
    const {classes} = this.props;
    return (
          <React.Fragment>
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
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={8}>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    < Link color="inherit" to='/' className={classes.link}>
                      toDoit
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                  </Typography>
                </Box>
              </Container>
            </main>
          </React.Fragment>
    )
  }

}

export default withStyles(styles)(selectProjects);
