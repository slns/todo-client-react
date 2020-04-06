import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Switche from '../../atoms/switche.js';

import { axiosInstance } from '../../../sevices/http/http';
import Header from '../../organisms/header';

class selectTasks extends Component {

  constructor(){
    super()
    this.state = {
      recentTasks: []
    }
  }

  componentDidMount() {
    // const { id, field } = this.props.match.params;
    
    //       axiosInstance.get(`tasks/${field}/${id}`)
          axiosInstance.get(this.props.match.url)
            .then(response => {

              let tasks = response.data.data;
              console.log('tasks',tasks)
                    this.setState({
                      recentTasks: tasks
                    })
              })
              .catch(function (error) {
                  console.log('Login  error', error);
              });  
  }

 makeStyles(theme) {
   return {
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
    }
   }
  };
 

  render(){
    return (
      <React.Fragment>
        <Header/>
            <CssBaseline />
        <main>
          <h1 align="center">{'Project'}</h1>
              <Container className={makeStyles.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {this.state.recentTasks.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                      <Card className={makeStyles.card}>
                        <CardContent className={makeStyles.cardContent}>
                          <div style={{textDecoration: `${card.done ? "line-through" : ""}` }}>
                              <Typography gutterBottom variant="h5" component="h2">
                                {card.description}
                              </Typography>
                            </div>
                          {/* <Typography>
                            Description
                          </Typography> */}
                        </CardContent>
                        <CardActions>
                          <Switche checked={card.done} task={card}/>
                          {/* <Button size="small" color="primary">
                            View
                          </Button> */}
                          <Button size="small" color="primary">
                            Edit
                          </Button>
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

export default selectTasks;
