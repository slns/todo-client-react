import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Switche from '../../atoms/switche.js';
import { axiosInstance } from '../../../sevices/http/http';
import Header from '../../organisms/header';
import { NewObjectCard, UpdateObjectCard } from '../../molecules';

import axios from 'axios'


class selectTasks extends Component {
  constructor(props){
    super(props)
    this.handlerForceUpdate = this.handlerForceUpdate.bind(this);
    this.state = {
      recentTasks: [],
      projectId: ''
    }
  }

  componentDidMount() {
    // const { id, field } = this.props.match.params; 
    const { id } = this.props.match.params; 
    this.state.projectId = id;
    const createCancelToken = () => axios.CancelToken.source()
    const cancelToken = createCancelToken()
    //       axiosInstance.get(`tasks/${field}/${id}`)

    axiosInstance.get(this.props.match.url, { cancelToken: cancelToken.token })
            .then(response => {
              let tasks = response.data.data;
                    this.setState({
                      recentTasks: tasks
                    })
              })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                  console.log('Request canceled', error.message);
                }
                 this.props.history.push("/");
              });  
  }

  handlerForceUpdate() {
    // this.forceUpdate();
    this.componentDidMount();
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
        <Header />
        <NewObjectCard field="tasks" objectId={this.state.projectId} name="Task" action={this.handlerForceUpdate}/>
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
                        </CardContent>
                        <CardActions>
                          <Switche checked={card.done} task={card}/>
                          {/* <Button size="small" color="primary" disabled={card.done}>
                            Edit
                          </Button> */}
                          <UpdateObjectCard field="tasks" object={card} name="Task" action={this.handlerForceUpdate}/>
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
