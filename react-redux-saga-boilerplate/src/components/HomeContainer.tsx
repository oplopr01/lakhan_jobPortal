import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import bgImg from "../assets/Images/bgimg.jpg"
import BASE_URL from '../services/service';

interface Skill {
  skill: string;
}

interface Category{
  categoryname:string;
  id:string;
}

interface Job {
  id: number;
  userId: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  dateOfPost: string;
  category: string;
  skills: Skill[];
  lastDate: string;
}

interface HomeContainerProps {
  login: boolean;
  userDetails: object;
}

interface jobCounts{
  category:string;
}

const LoginPromptModal: React.FC<{ show: boolean; handleClose: () => void }> = ({
  show,
  handleClose,
}) => {
  let navigate = useNavigate();
  
return (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton className="border-0">
      <Modal.Title className="w-100 text-center">Please Login/Register</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <p className="mb-4">You need to be logged in to apply for jobs.</p>
      <div className="d-flex justify-content-center">
        <Button className="mx-2" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Log In
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);
};

const HomeContainer: React.FC<HomeContainerProps> = ({ userDetails, login }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categoryData,setCategoryData] = useState<Category[]>([])
  const [showModal, setShowModal] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [jobSkills, setJobSkillsSearch] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [categorySearch, setCategorySearch] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [jobCounts, setJobCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/joblisting`);
        const data = await response.json();
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };


    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/categories`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategoryData(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  

    const fetchJobCounts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/jobcounts`);
        const data = await response.json();
        setJobCounts(data.counts);
      } catch (error) {
        console.error('Error fetching job counts:', error);
      }
    };

    fetchJobs();
    fetchJobCounts();
    fetchCategories();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const applyJobHandler = (jobId: number) => {
    if (login) {
      navigate(`/viewdetails/${jobId}`, { state: { userDetails } });
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewMoreJobs = () => {
    setShowAllJobs(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Applying search:', jobSkills, locationSearch, categorySearch);

    const filtered = jobs.filter(job => {
      const skillMatch = jobSkills === '' || job.skills.some(skill => skill.skill.toLowerCase().includes(jobSkills.toLowerCase()));
      const locationMatch = locationSearch === '' || job.location.city.toLowerCase().includes(locationSearch.toLowerCase()) || job.location.country.toLowerCase().includes(locationSearch.toLowerCase());
      const categoryMatch = categorySearch === '' || job.category.categoryname.toLowerCase().includes(categorySearch.toLowerCase());

      return skillMatch && locationMatch && categoryMatch;
    });

    console.log('Filtered jobs:', filtered);
    setFilteredJobs(filtered);
  };

  const handleReset = () => {
    setJobSkillsSearch('');
    setLocationSearch('');
    setCategorySearch('');
    setFilteredJobs(jobs);
  };

  const handleCategoryClick = (category: string) => {
    setCategorySearch(category);
    const filtered = jobs.filter(job => job.category.categoryname.toLowerCase() === category.toLowerCase());
    setFilteredJobs(filtered);
  };
return (
    <div className="homepage-container pt-5 mt-5">
      <div className="container">
        <div className="jumbotron mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
          <h1 className="display-4 text-center">Find Job</h1>
          <p className="lead text-center">Search jobs by skill, location, and category.</p>

          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputSkill"
                  placeholder="Skill"
                  value={jobSkills}
                  onChange={(e) => setJobSkillsSearch(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  placeholder="Location"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <select
                  id="inputCategory"
                  className="form-control"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                >
                  <option value="">Choose Category...</option>
                  {categoryData.map((cat) => (
                    <option value={cat.categoryname} key={cat.id}>
                      {cat.categoryname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary m-2">
                Search
              </button>
              <Button variant="secondary" onClick={handleReset} className="ml-2">
                Reset
              </Button>
            </div>
          </form>
        </div>
        <div className="row m-5">
          <div className="col-12 mb-4">
            <h2 className="text-center mb-4 text-dark">Explore by Categories</h2>
          </div>
          {jobCounts.map((cat) => (
            <div className="col-12 col-md-4 col-lg-3 mb-4" key={cat.category}>
              <div
                className="card bg-dark text-white"
                onClick={() => handleCategoryClick(cat.category)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{cat.category}</h5>
                  <p className="card-text">Total Jobs: {cat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-5">
  <div className="col-12 mb-4">
    <h2 className="text-center mb-4 text-primary">Featured Jobs</h2>
  </div>
  {filteredJobs.slice(0, showAllJobs ? filteredJobs.length : 9).map((job) => (
    <div className="col-12 col-md-6 col-lg-4 mb-4" key={job.id}>
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <p className="card-title text-dark font-weight-bold h4">{job.title}</p>
          <h5 className="card-text text-muted">
            <i className="bi bi-geo-alt-fill text-primary"></i> {job.location.city}, {job.location.country}
          </h5>
          <h5 className="text-info">Category: {job.category.categoryname}</h5>
          <h5 className="card-text text-success font-weight-bold">Salary: {job.salary}</h5>
          <h5 className="card-text text-warning">
            Skills: {job.skills.map((skill) => skill.skill).join(', ')}
          </h5>
          <h5 className="card-text text-secondary">Date Posted: {formatDate(job.dateOfPost)}</h5>
          <button 
            onClick={() => applyJobHandler(job.id)} 
            className="btn btn-outline-primary mt-3 w-100"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
{!showAllJobs && filteredJobs.length > 9 && (
  <div className="text-center mt-4">
    <button onClick={handleViewMoreJobs} className="btn btn-secondary">
      View More Jobs
    </button>
  </div>
)}

        <LoginPromptModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default HomeContainer;