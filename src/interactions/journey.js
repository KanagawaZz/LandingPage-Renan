export function createJourneyUpdater(prefersReducedMotion) {
  // A linha e o contador acompanham a leitura. Com movimento reduzido, a linha fica estática.
  const journey = !prefersReducedMotion ? document.querySelector('[data-journey]') : null;
  if (!journey) return;

  const journeyTrack = journey.querySelector('.journey-track');
  const journeyStages = [...journey.querySelectorAll('[data-journey-stage]')];
  const journeyNodes = [...journey.querySelectorAll('.journey-node')];
  const journeyCounter = document.querySelector('[data-journey-counter]');
  let activeStage = -1;
  journey.classList.add('journey-animated');
  journey.closest('.journey-section')?.classList.add('is-animated');

  function setActiveStage(index) {
    if (index === activeStage) return;
    activeStage = index;
    journeyStages.forEach((stage, i) => stage.classList.toggle('is-active', i === index));
    if (journeyCounter) journeyCounter.textContent = journeyStages[index].dataset.index;
  }

  function updateJourney() {
    if (!journeyTrack || !journeyNodes.length) return;
    const anchor = window.innerHeight * 0.55;
    const nodeCenters = journeyNodes.map((node) => {
      const { top, height } = node.getBoundingClientRect();
      return top + height / 2;
    });
    const first = nodeCenters[0];
    const last = nodeCenters.at(-1);
    const trackLength = last - first;

    if (trackLength > 0) {
      journey.style.setProperty('--journey-track-length', `${trackLength}px`);
      const progress = Math.min(1, Math.max(0, (anchor - first) / trackLength));
      journey.style.setProperty('--journey-progress', progress.toFixed(4));
      journeyStages.forEach((stage, i) => stage.classList.toggle('is-reached', nodeCenters[i] <= anchor));
    }
    setActiveStage(Math.max(0, nodeCenters.findLastIndex((center) => center <= anchor)));
  }

  return updateJourney;
}
