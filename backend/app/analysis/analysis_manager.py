from typing import Dict, Any, List
import asyncio
import logging
from app.schemas.responses import AnalysisResults
from app.core.config import settings

from app.analysis.bug_detector import BugDetector
from app.analysis.complexity_analyzer import ComplexityAnalyzer
from app.analysis.security_analyzer import SecurityAnalyzer
from app.analysis.code_smell_detector import CodeSmellDetector
from app.analysis.optimization_engine import OptimizationEngine
from app.analysis.best_practices import BestPractices
from app.analysis.execution_flow import ExecutionFlow
from app.analysis.learning_recommender import LearningRecommender

logger = logging.getLogger(__name__)

class AnalysisManager:
    """
    Coordinates various code analyzers explicitly using individual files.
    Respects Clean Architecture and Single Responsibility Principle.
    """
    def __init__(self):
        self.bug_detector = BugDetector()
        self.complexity_analyzer = ComplexityAnalyzer()
        self.security_analyzer = SecurityAnalyzer()
        self.code_smell_detector = CodeSmellDetector()
        self.optimization_engine = OptimizationEngine()
        self.best_practices = BestPractices()
        self.execution_flow = ExecutionFlow()
        self.learning_recommender = LearningRecommender()

    async def run_analysis(self, code: str, language: str) -> AnalysisResults:
        analysis = AnalysisResults()
        
        if not settings.ENABLE_DEEP_ANALYSIS:
            return analysis

        # To prevent API timeouts/rate-limits, we chunk the tasks slightly or just run them concurrently.
        # Running all 8 concurrently could cause issues with Gemini rate limits on free tiers.
        # We will run them in two batches:
        
        batch_1_tasks = []
        batch_2_tasks = []

        if settings.ENABLE_SECURITY_ANALYSIS:
            batch_1_tasks.append(self.bug_detector.analyze(code, language))
            batch_1_tasks.append(self.security_analyzer.analyze(code, language))
        else:
            batch_1_tasks.append(self.bug_detector.analyze(code, language))
            
        if settings.ENABLE_ARCHITECTURE_ANALYSIS:
            batch_1_tasks.append(self.code_smell_detector.analyze(code, language))
            batch_1_tasks.append(self.best_practices.analyze(code, language))
            batch_2_tasks.append(self.optimization_engine.analyze(code, language))

        if settings.ENABLE_COMPLEXITY_ANALYSIS:
            batch_2_tasks.append(self.complexity_analyzer.analyze(code, language))
            batch_2_tasks.append(self.execution_flow.analyze(code, language))
            batch_2_tasks.append(self.learning_recommender.analyze(code, language))

        # Execute Batch 1
        batch_1_results = await asyncio.gather(*batch_1_tasks, return_exceptions=True)
        # Execute Batch 2
        batch_2_results = await asyncio.gather(*batch_2_tasks, return_exceptions=True)
        
        # Merge Results based on what was enabled
        all_results = batch_1_results + batch_2_results
        
        # Map back to AnalysisResults (this requires knowing the order, 
        # so let's safely assign them based on type or just explicitly await them)
        # Actually, explicitly awaiting them in pairs/groups is safer for type-mapping.
        
        return await self._execute_and_merge(code, language, analysis)

    async def _execute_and_merge(self, code: str, language: str, analysis: AnalysisResults) -> AnalysisResults:
        # We can just use asyncio.gather for specific groupings to safely map the results back
        t_bugs = self.bug_detector.analyze(code, language)
        t_sec = self.security_analyzer.analyze(code, language) if settings.ENABLE_SECURITY_ANALYSIS else self._mock_list()
        t_smells = self.code_smell_detector.analyze(code, language) if settings.ENABLE_ARCHITECTURE_ANALYSIS else self._mock_list()
        t_bp = self.best_practices.analyze(code, language) if settings.ENABLE_ARCHITECTURE_ANALYSIS else self._mock_list()
        
        r_bugs, r_sec, r_smells, r_bp = await asyncio.gather(t_bugs, t_sec, t_smells, t_bp, return_exceptions=True)
        
        analysis.bugs = r_bugs if not isinstance(r_bugs, Exception) else []
        analysis.security = r_sec if not isinstance(r_sec, Exception) else []
        analysis.code_smells = r_smells if not isinstance(r_smells, Exception) else []
        analysis.best_practices = r_bp if not isinstance(r_bp, Exception) else []

        t_opt = self.optimization_engine.analyze(code, language) if settings.ENABLE_ARCHITECTURE_ANALYSIS else self._mock_list()
        t_comp = self.complexity_analyzer.analyze(code, language) if settings.ENABLE_COMPLEXITY_ANALYSIS else self._mock_dict()
        t_flow = self.execution_flow.analyze(code, language) if settings.ENABLE_COMPLEXITY_ANALYSIS else self._mock_list()
        t_learn = self.learning_recommender.analyze(code, language) if settings.ENABLE_COMPLEXITY_ANALYSIS else self._mock_list()

        r_opt, r_comp, r_flow, r_learn = await asyncio.gather(t_opt, t_comp, t_flow, t_learn, return_exceptions=True)

        analysis.optimizations = r_opt if not isinstance(r_opt, Exception) else []
        if not isinstance(r_comp, Exception):
            analysis.time_complexity = r_comp.get("time_complexity", {})
            analysis.space_complexity = r_comp.get("space_complexity", {})
        analysis.execution_flow = r_flow if not isinstance(r_flow, Exception) else []
        analysis.learning_recommendations = r_learn if not isinstance(r_learn, Exception) else []
        
        return analysis

    async def _mock_list(self):
        return []
        
    async def _mock_dict(self):
        return {}
