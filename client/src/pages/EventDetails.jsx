import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EventDetails = () => {
  const [title, setTitle] = useState("");
  const params = useParams();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [ctime, setCTime] = useState("");
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/event/get-event/${params.slug}`);
      setTitle(data.event.title);
      setDescription(data.event.description);
      setDate(data.event.date);
      setTime(data.event.time);
      setLocation(data.event.location);
      setId(data.event._id);
      setCTime(data.event.createdAt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <Layout title={"EventDetails - MindV"}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <img
                src={`/api/v1/event/event_photo/${id}`}
                className="card-img-top mb-4 h-100"
                alt="Event Photo"
              />
              <h5 className="card-title mb-3">{title}</h5>
              <p className="card-text mb-2">{description}</p>
              <ul className="list-unstyled mb-4">
                <li className="text-secondary mb-1">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Date: {date}
                </li>
                <li className="text-secondary mb-1">
                  <i className="far fa-clock mr-2"></i>
                  Time: {time}
                </li>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Venue: {location}
                </li>
              </ul>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Created At: {ctime}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
