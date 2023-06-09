import React, {useState} from 'react';
import { Button, Input, } from 'antd';
import {projects} from '../data/data';
import { ProjectModel } from '../models/ProjectModel';
import { AffairModel } from '../models/AffairModel';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined} from "@ant-design/icons"

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Projets', 'projet'),
  getItem('Affaires', 'business'),
  getItem('Entités', 'entity'),
  getItem('Clients', 'client'),
];

interface SelectionProps {
  selectedProjects: ProjectModel[];
  selectedBusinesses: AffairModel[];  
}

interface ContainerProps {
  onConfirmSelection: (selection: SelectionProps) => void;
}

const { Search } = Input;

const Container: React.FC<ContainerProps> = ({onConfirmSelection}) => {
  const [selectedProjects, setSelectedProjects] = useState<ProjectModel[]>([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<AffairModel[]>([]);
  const [current, setCurrent] = useState('projet');
  const [seachValue, setSeachValue] = useState('');

  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key);
  };

  const handleSeach = (e: any) => {
    setSeachValue(e.target.value);
  };  

  const handleProjectSelection = (projet: ProjectModel) => {    
    const isSelected = selectedProjects.some((p) => p.id === projet.id);    

    if (isSelected) {      
      const updatedProjects = selectedProjects.filter((p) => p.id !== projet.id);
      setSelectedProjects(updatedProjects);
    } else {      
      setSelectedProjects([...selectedProjects, projet]);
    }    
  }

  const handleBusinessSelection = (business: AffairModel) => {
    const isSelected = selectedBusinesses.some((p) => p.id === business.id);

    if (isSelected) {
      const updateBusinesses = selectedBusinesses.filter((p) => p.id === business.id);
      setSelectedBusinesses(updateBusinesses);
    } else {
      setSelectedBusinesses([...selectedBusinesses, business]);
    }
  };

  const handleConfirmSelection = () => {
    const selection: SelectionProps = {
      selectedProjects,
      selectedBusinesses,
    };
    onConfirmSelection(selection);
  };  

  return (
    <div className="app">
      <div className="col-3 sidebar">
        <Menu onClick={onClick} style={{height: "100vh", fontSize: "1.1em"}} mode="vertical" items={items} selectedKeys={[current]} />
      </div>
    
      <div className="col-6 container">
        <Search placeholder="Rechercher..." allowClear onChange={handleSeach} />

        {
          current === "projet" && (
          <ul className="container-list-container">
            {
              projects.filter((projet) => projet.name.includes(seachValue)).map((projet: any) => {
                return (
                  <li key={projet.id} className="container-list"
                  onClick={() => {handleProjectSelection(projet)}}
                  >
                    {!selectedProjects.includes(projet) ? <PlusCircleOutlined rev='' style={{position: 'relative', bottom: "3px"}} /> : <MinusCircleOutlined rev='' style={{position: 'relative', bottom: "3px", opacity: "0.5"}} />} {projet.name}
                  </li>
                )
              })
            }
          </ul>
          )
        }

        {
          current === "business" && (
          <ul className="container-list-container">
            {
              projects
              .map((projet: any) => 
              projet?.affairs?.filter((affair: any) => affair.name.includes(seachValue))
              .map((business: any, index: number) => {
                return (
                  <li key={business.id} className="container-list" 
                  onClick={() => handleBusinessSelection(business)}>
                    {!selectedBusinesses.includes(business) ? <PlusCircleOutlined rev='' style={{position: 'relative', bottom: "3px"}} /> : <MinusCircleOutlined rev='' style={{position: 'relative', bottom: "3px", opacity: "0.5"}} />} {business.name}
                  </li>
                )
              })
            )
            }
          </ul>
          )
        }
      </div>

      <div className="selection col-3">
        <h4>Sélection</h4>
        <h5 className="title">{selectedProjects.length} Projets</h5>
        {selectedProjects.map((project, index) => {
          return (
            <h6 key={index}>{project.name}</h6>
          )
        })}

      <h5 className="title">{selectedBusinesses.length} Affaires</h5>
        {selectedBusinesses.map((business, index) => {
          return (
            <h6 key={index}>{business.name}</h6>
          )
        })}
        <Button type="primary" className="btn-confirm" 
        onClick={handleConfirmSelection}>Confirmer</Button>
      </div>
    </div>
  );
};

export default Container;