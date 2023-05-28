import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClanForm from "./ClanForm";
import Loader from "../../../components/Loader";
import AnnonceClan from "./AnnonceClan";
import ClanResponse from "./ClanResponse";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Clans() {
  const [clansAnnonce, setClansAnnonce] = useState([]);
  const [hasAnnonce, setHasAnnonce] = useState(false);
  const [annonce, setAnnonce] = useState([]);
  const [isFilling, setIsFilling] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [isElder, setIsElder] = useState(false);
  const [hasClan, setHasClan] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token_user = localStorage.getItem("authToken");

    axios
      .get(`${serverUrl}/api/annonceclan`, {
        headers: {
          Authorization: `Bearer ${token_user}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setClansAnnonce(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });

    axios
      .get(`${serverUrl}/api/annonceclan/clan`, {
        headers: {
          Authorization: `Bearer ${token_user}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAnnonce(response.data);
          setHasAnnonce(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        if (error.response.status === 404) {
          if (error.response.data.message === "no annonce found") {
            setHasClan(true);
            setHasAnnonce(false);
          }
          if (error.response.data.message === "no clan linked") {
            setHasClan(false);
            setHasAnnonce(false);
          }
        }
      });

    axios
      .get(`${serverUrl}/api/coc/player`, {
        headers: {
          Authorization: `Bearer ${token_user}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.clan) {
          setHasClan(true);
          setIsElder(
              response.data.role === "coLeader" ||
              response.data.role === "leader"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  function handleClickDelete() {
    const token_user = localStorage.getItem("authToken");
    axios
      .delete(`${serverUrl}/api/annonceclan`, {
        headers: {
          Authorization: `Bearer ${token_user}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setHasAnnonce(false);
        setAnnonce([]);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }

  return (
    <div className="page-annonce">
      <h1>Clan cherche Joueur</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isFilling ? (
            <ClanForm
              setIsFilling={setIsFilling}
              hasAnnonce={hasAnnonce}
              setHasAnnonce={setHasAnnonce}
              annonce={annonce}
              setAnnonce={setAnnonce}
            />
          ) : isResponse ? (
            <ClanResponse
              isResponse={isResponse}
              setIsResponse={setIsResponse}
            />
          ) : (
            <>
              <div className="container-annonces">
                <div className="container-annonce">
                  <h3>Votre annonce</h3>
                  {hasClan ? (
                    !isElder ? (
                      <> Vous devez être au moins chef ajdjoint pour créer ou modifier une anonce pour votre clan</>):
                    hasAnnonce ? (
                      <>
                        <button
                          className="clash-button blue-button"
                          onClick={() => setIsFilling(true)}
                        >
                          Modifier
                        </button>
                        <button
                          className="clash-button red-button"
                          onClick={handleClickDelete}
                        >
                          Supprimer
                        </button>
                        <button
                          className="clash-button green-button"
                          onClick={() => setIsResponse(true)}
                        >
                          Réponses
                        </button>
                      </>
                    ) : (
                      <button
                        className="clash-button green-button"
                        onClick={() => setIsFilling(true)}
                      >
                        Créer
                      </button>
                    )
                  ) : (
                    <>
                      <p>Connectez-vous pour créer une annonce</p>
                      <button
                        className="clash-button green-button"
                        onClick={() => navigate("/logincoc")}
                      >
                        Se connecter
                      </button>
                    </>
                  )}
                </div>
                {clansAnnonce.map((annonce) => (
                  <AnnonceClan
                    annonce={annonce}
                    key={annonce._id}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Clans;
