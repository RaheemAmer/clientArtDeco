/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./onGoingJob.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import BTN from "../../../components/button/btn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstace } from "../../../network/axiosConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import "./jobDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@mui/material";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineItem from "@mui/lab/TimelineItem";
import Timeline from "@mui/lab/Timeline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Button } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const MySwal = withReactContent(Swal);


// const HandleClick = () => {
//   MySwal.fire({
//     title: "End The Job!",
//     text: "Please Review The Contractor To End This Job ...",
//     type: "success",
//     showCancelButton: true,
//   }).then(result => {
//     if (result.isConfirmed) window.location = `/jobRate`;
//   });
// };

export default function OnGoingJob() {
  const params = useParams();

  const [jobDetails, setJobDetails] = useState([]);
  // const [ProposalDetails, setProposalDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    axiosInstace
      .get(`users/getMyOngoingJobs/${params.id}`)
      .then(res => {
        console.log(res);
        setJobDetails(res.data.data.currentJob);
        console.log("result", res.data.data.currentJob);
        // setProposalDetails(res.data.data.currentJob.proposals[0]);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <div className='container m-md-5 JobsPage-container'>
        {isLoading ? (
          <div className='w-100 position-relative'>
            <Box
              className='position-absolute top-0 start-50 translate-middle-x'
              sx={{ display: "flex" }}
            >
              <CircularProgress className='m-5' />
            </Box>
          </div>
        ) : (
          <section
            key={jobDetails.id}
            className='jobsSection border p-sm-3 p-xs-5 col-12'
          >
            <div className='d-flex justify-content-between'>
              <h5 className='d-inline-block  w-auto'>{jobDetails.headLine}</h5>
            </div>
            <div className='jobInfoLine my-2'>
              <span className='border-end border-warning border-3 px-3'>
                Budget:&nbsp;{jobDetails.budget}
              </span>
              <span className='border-end border-warning border-3 px-3'>
                {new Date(Date.parse(jobDetails.createdAt)).toDateString()}
              </span>
              <span className='border-end border-warning border-3 px-3'>
                Estimated Time:&nbsp;{jobDetails.estimatedTime}
              </span>
              <span className='px-3'>
                <FontAwesomeIcon icon={faLocationDot} />
                &nbsp;{jobDetails.location}
              </span>
            </div>
            <div className='jobDescription my-3'>
              <p>{jobDetails.description}</p>
            </div>
            <div className='Proposals my-3'>
              <p>
                Proposals :&nbsp;
                <span className='jobKeyWord rounded-pill p-1 me-2'>
                  {jobDetails.totalProposal}
                </span>
              </p>
            </div>
            <Grid item lg={6} md={12} className='experience pb_30 timeLineContainer'>
              <Timeline className='timeline'>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot className='timeline_dot_header'>
                      <LocalOfferIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant='h6' className='timeline_header'>
                      Accepted Proposal
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem key={jobDetails.acceptedProposal.contractor._id}>
                  <TimelineSeparator className='separator_padding'>
                    <TimelineDot
                      variant='outlined'
                      className='timeline_dot'
                    />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className='timeline_content'>
                    <Typography className='timeline_title'>
                      Company Name :&nbsp;
                      {jobDetails.acceptedProposal.contractor.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      className='timeline_description'
                    >
                      Estimated time :&nbsp;{jobDetails.acceptedProposal.estimatedTime}
                    </Typography>
                    <Typography
                      variant='body2'
                      className='timeline_description'
                    >
                      Cover letter :&nbsp;{jobDetails.acceptedProposal.coverLetter}
                    </Typography>
                    <Typography className='timeline_description'>
                      Financial Offer :&nbsp;
                      {jobDetails.acceptedProposal.financialOffer}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <div className='w-100 text-center d-flex justify-content-center px-5 mt-4'>
                  <Link to={`/${jobDetails.id}/jobRate/${jobDetails.acceptedProposal.contractor._id}`}>
                    <Button
                      className='endJobButton mt-2'
                      variant='contained'
                      color='success'
                    >
                      End Job
                    </Button>
                  </Link>
                </div>
              </Timeline>
            </Grid>
          </section>
        )}
      </div>
    </div>
  );
}
