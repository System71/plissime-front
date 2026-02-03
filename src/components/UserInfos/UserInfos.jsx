/* eslint-disable react/prop-types */
import styles from "./user-infos.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const UserInfos = ({ token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [siret, setSiret] = useState("");
  const [certification, setCertification] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/informations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setEmail(response.data.email);
        setName(response.data.name);
        setFirstName(response.data.firstName);
        setAddress(response.data.address);
        setZip(response.data.zip);
        setCity(response.data.city);
        setPhone(response.data.phone);
        setActivity(response.data.activity);
        setSiret(response.data.siret);
        setCertification(response.data.certification);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  const validateUserForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide.";
    }
    if (!password || password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }
    if (!name) {
      newErrors.name = "Le nom est requis.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
      newErrors.name = "Au moins un caractère est non autorisé.";
    }
    if (!firstName) {
      newErrors.firstName = "Le prénom est requis.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(firstName)) {
      newErrors.firstName = "Au moins un caractère est non autorisé.";
    }
    if (!address) {
      newErrors.address = "L'adresse est requise.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' ,.-]+$/.test(address)) {
      newErrors.address = "Au moins un caractère est non autorisé.";
    }
    if (!zip) {
      newErrors.zip = "Le code postal est requis.";
    } else if (zip.length != 5) {
      newErrors.zip = "Le code postal doit comporter 5 chiffres.";
    }
    if (!city) {
      newErrors.city = "La ville est requise.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(city)) {
      newErrors.city = "Au moins un caractère est non autorisé.";
    }
    if (!phone) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Le numéro de téléphone ne doit comporter exactement 10 chiffres.";
    }
    if (!activity) {
      newErrors.activity = "L'activité est requise.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(activity)) {
      newErrors.activity = "Au moins un caractère est non autorisé.";
    }
    if (!siret) {
      newErrors.siret = "Le numéro de SIRET est requis.";
    } else if (!/^\d+$/.test(siret)) {
      newErrors.siret =
        "Le numéro de SIRET ne doit comporter que des chiffres.";
    } else if (siret.length != 14) {
      newErrors.siret = "Le numéro de SIRET doit comporter 14 caractères.";
    }

    return newErrors;
  };

  const modifyUser = async () => {
    const validationErrors = validateUserForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/user/informations`,
        {
          email: email,
          name: name,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          activity: activity,
          siret: siret,
          certification: certification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const createStripeAccount = async () => {
    try {
      // 1. Appeler ton backend pour créer le compte connecté
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/create-connected-account`,
        {}, // Pas de body nécessaire ici
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // 2. Récupérer l'URL envoyée par ton backend
      const { url } = response.data;
      // 3. Rediriger vers Stripe pour l'onboarding
      window.location.href = url;
    } catch (error) {
      console.error("Erreur création compte Stripe", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <>
      <div className={styles["user-settings"]}>
        {isLoading ? (
          <p>En chargement</p>
        ) : (
          <div>
            <div className={styles.line}>
              <div className={styles.item}>
                <div className={styles.itemInfo}>
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    placeholder="Votre email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.email}</p>
              </div>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.password}</p>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="name">Nom :</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Votre nom"
                    value={name}
                    readOnly
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.name}</p>
              </div>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="firstName">Prénom :</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Votre prénom"
                    value={firstName}
                    readOnly
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.firstName}</p>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="address">Adresse :</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Votre adresse"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.address}</p>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="zip">Code postal :</label>
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="Votre code postal"
                    value={zip}
                    onChange={(event) => {
                      setZip(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.zip}</p>
              </div>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="city">Ville :</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Votre ville"
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.city}</p>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="phone">Téléphone :</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Votre numéro de téléphone"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.phone}</p>
              </div>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="activity">Activité :</label>
                  <input
                    type="text"
                    name="activity"
                    id="activity"
                    placeholder="Votre activité"
                    value={activity}
                    onChange={(event) => {
                      setActivity(event.target.value);
                    }}
                  />
                </div>
                <p className={styles["error-message"]}>{errors.activity}</p>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles["item"]}>
              <div className={styles.itemInfo}>
                <label htmlFor="siret">SIRET :</label>
                <input
                  type="number"
                  name="siret"
                  id="siret"
                  placeholder="Votre SIRET"
                  value={siret}
                  onChange={(event) => {
                    setSiret(event.target.value);
                  }}
                />
              </div>
              <p className={styles["error-message"]}>{errors.siret}</p>
            </div>
            <div className={styles.line}>
              <div className={styles["item"]}>
                <div className={styles.itemInfo}>
                  <label htmlFor="certification">Certification :</label>
                  <input
                    type="text"
                    name="certification"
                    id="certification"
                    placeholder="Votre numéro de certification"
                    value={certification}
                    onChange={(event) => {
                      setCertification(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label>Connexion STRIPE</label>
              <button type="button" onClick={createStripeAccount}>
                CONNEXION STRIPE
              </button>
            </div>
            <div>
              <button onClick={modifyUser}>Modifier mes informations</button>
              <p className={styles["error-message-back"]}>{errorBack}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfos;
