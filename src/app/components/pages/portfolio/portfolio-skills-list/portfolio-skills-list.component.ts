import { Component, Input } from '@angular/core';
import { Skill, SkillsCategory } from 'src/app/core/models';

@Component({
  selector: 'app-portfolio-skills-list',
  templateUrl: './portfolio-skills-list.component.html',
  styleUrls: ['./portfolio-skills-list.component.scss']
})
export class PortfolioSkillsListComponent {
  skillsData: SkillsCategory[] = [
    {
      id: 1,
      name: "Machine Learning",
      description: "Building and deploying ML models",
      skills: [
        { id: 1, name: "TensorFlow", proficiency: 9, category: 1, description: "Deep Learning & Neural Networks" },
        { id: 2, name: "scikit-learn", proficiency: 8, category: 1, description: "ML algorithms & model training" },
        { id: 3, name: "PyTorch", proficiency: 7, category: 1, description: "Deep Learning research & development" },
      ]
    },
    {
      id: 2,
      name: "Data Analysis",
      description: "Processing and analyzing large datasets",
      skills: [
        { id: 4, name: "Pandas", proficiency: 9, category: 2, description: "Data manipulation & analysis" },
        { id: 5, name: "NumPy", proficiency: 8, category: 2, description: "Numerical computing & arrays" },
        { id: 6, name: "SQL", proficiency: 8, category: 2, description: "Data querying & management" },
      ]
    },
    {
      id: 3,
      name: "AI Applications",
      description: "Practical AI implementation",
      skills: [
        { id: 7, name: "NLP", proficiency: 8, category: 3, description: "Natural Language Processing" },
        { id: 8, name: "Computer Vision", proficiency: 7, category: 3, description: "Image & video analysis" },
        { id: 9, name: "MLOps", proficiency: 7, category: 3, description: "ML deployment & operations" },
      ]
    }
  ];
  @Input() skill!: Skill;

  getCategoryIcon(categoryName: string): string {
    switch (categoryName.toLowerCase()) {
      case 'machine learning':
        return 'brain-circuit';
      case 'data analysis':
        return 'chart';
      case 'ai applications':
        return 'sparkles';
      default:
        return 'database';
    }
  }

  // Helper to calculate full stars
  getFullStars(proficiency: number): number {
    return Math.floor(proficiency / 2);
  }

  // Helper to check for half star
  hasHalfStar(proficiency: number): boolean {
    return proficiency % 2 !== 0;
  }

}
