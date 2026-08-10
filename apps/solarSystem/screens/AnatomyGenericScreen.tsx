import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const BG_URL = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=3000&auto=format&fit=crop';

const ANATOMY_DATA: Record<number, any> = {
  3: {
    title: "Three Kinds of Muscle",
    question: "What are three kinds of muscle?",
    items: [
      { id: 'skeletal', label: 'Skeletal', icon: '🏃‍♂️', color: '#FFB74D', info: 'Skeletal muscles are attached to your bones and help you move when you want to, like running or jumping.' },
      { id: 'smooth', label: 'Smooth', icon: '🌭', color: '#E57373', info: 'Smooth muscles work automatically without you thinking about it, like your stomach digesting food.' },
      { id: 'cardiac', label: 'Cardiac', icon: '❤️', color: '#64B5F6', info: 'Cardiac muscle is a special, super-strong muscle that makes up your heart and pumps blood all day and night.' },
    ]
  },
  4: {
    title: "Nervous System",
    question: "What are three parts of the nervous system?",
    items: [
      { id: 'brain', label: 'Brain', icon: '🧠', color: '#FFB74D', info: 'The brain is the boss of your body! It controls everything you do, think, and feel.' },
      { id: 'spinal', label: 'Spinal Cord', icon: '🦴', color: '#E57373', info: 'The spinal cord is a thick bundle of nerves that runs down your back like a super-highway for messages.' },
      { id: 'nerves', label: 'Nerves', icon: '⚡', color: '#FFF176', info: 'Nerves are tiny wires that carry messages back and forth between your brain and the rest of your body.' },
    ]
  },
  5: {
    title: "Five Main Senses",
    question: "What are the five main senses?",
    items: [
      { id: 'sight', label: 'Sight', icon: '👁️', color: '#FFB74D', info: 'Your eyes let you see colors, shapes, and the world around you.' },
      { id: 'smell', label: 'Smell', icon: '👃', color: '#E57373', info: 'Your nose helps you smell delicious food and fragrant flowers.' },
      { id: 'hearing', label: 'Hearing', icon: '👂', color: '#FFF176', info: 'Your ears let you hear music, voices, and birds singing.' },
      { id: 'touch', label: 'Touch', icon: '🖐️', color: '#64B5F6', info: 'Your skin lets you feel if something is hot, cold, soft, or spiky.' },
      { id: 'taste', label: 'Taste', icon: '👅', color: '#81C784', info: 'Your tongue lets you taste sweet, salty, sour, and bitter flavors.' },
    ]
  },
  6: {
    title: "Digestive System",
    question: "What are some parts of the digestive system?",
    items: [
      { id: 'mouth', label: 'Mouth', icon: '👄', color: '#FFB74D', info: 'Digestion starts here! Your teeth chew food and saliva breaks it down.' },
      { id: 'esophagus', label: 'Esophagus', icon: '🚰', color: '#E57373', info: 'A long tube that squishes your food down from your mouth to your stomach.' },
      { id: 'stomach', label: 'Stomach', icon: '🥣', color: '#FFF176', info: 'A muscular bag that mashes up food into a soupy mix.' },
      { id: 'liver', label: 'Liver', icon: '🧪', color: '#64B5F6', info: 'A chemical factory that makes juices to help digest fats.' },
      { id: 'small_intestine', label: 'Small Intestine', icon: '🍝', color: '#81C784', info: 'A super long, coiled tube that absorbs all the good nutrients from your food.' },
      { id: 'large_intestine', label: 'Large Intestine', icon: '🗑️', color: '#BA68C8', info: 'Takes the leftover waste and absorbs water before it leaves the body.' },
    ]
  },
  7: {
    title: "Excretory System",
    question: "What are four parts of the excretory system?",
    items: [
      { id: 'urinary', label: 'Urinary Tract', icon: '🚽', color: '#FFB74D', info: 'Filters your blood and removes liquid waste as urine.' },
      { id: 'lungs', label: 'Lungs', icon: '🫁', color: '#E57373', info: 'They get rid of carbon dioxide waste when you breathe out.' },
      { id: 'skin', label: 'Skin', icon: '💦', color: '#FFF176', info: 'Releases sweat to cool you down and remove some waste.' },
      { id: 'intestines', label: 'Intestines', icon: '💩', color: '#64B5F6', info: 'Get rid of solid waste left over after digesting food.' },
    ]
  },
  8: {
    title: "Circulatory System",
    question: "What are six parts of the circulatory system?",
    items: [
      { id: 'heart', label: 'Heart', icon: '❤️', color: '#FFB74D', info: 'The pump that pushes blood all around your body.' },
      { id: 'arteries', label: 'Arteries', icon: '🔴', color: '#E57373', info: 'Tubes that carry fresh, oxygen-rich blood away from the heart.' },
      { id: 'veins', label: 'Veins', icon: '🔵', color: '#FFF176', info: 'Tubes that carry blood back to the heart to get more oxygen.' },
      { id: 'capillaries', label: 'Capillaries', icon: '🕸️', color: '#64B5F6', info: 'Tiny, thin tubes that connect arteries and veins.' },
      { id: 'cells', label: 'Blood Cells', icon: '🩸', color: '#81C784', info: 'Red cells carry oxygen, and white cells fight off sickness.' },
      { id: 'platelets', label: 'Platelets', icon: '🩹', color: '#BA68C8', info: 'Little helpers in your blood that stick together to stop bleeding when you get a cut.' },
    ]
  },
  9: {
    title: "Lymph System",
    question: "What are four parts of the lymph system?",
    items: [
      { id: 'vessels', label: 'Lymph Vessels', icon: '🛤️', color: '#FFB74D', info: 'Tubes that carry a clear fluid called lymph around your body.' },
      { id: 'nodes', label: 'Lymph Nodes', icon: '🟢', color: '#E57373', info: 'Little checkpoints that filter out germs to keep you healthy.' },
      { id: 'spleen', label: 'Spleen', icon: '🛡️', color: '#FFF176', info: 'An organ that filters your blood and helps fight infections.' },
      { id: 'thymus', label: 'Thymus', icon: '🏫', color: '#64B5F6', info: 'A training school for special white blood cells.' },
    ]
  },
  10: {
    title: "Respiratory System",
    question: "What are some parts of the respiratory system?",
    items: [
      { id: 'nose', label: 'Nose', icon: '👃', color: '#FFB74D', info: 'Warms, moistens, and filters the air you breathe in.' },
      { id: 'pharynx', label: 'Pharynx', icon: '🗣️', color: '#E57373', info: 'Your throat! It carries both food and air down.' },
      { id: 'larynx', label: 'Larynx', icon: '🎤', color: '#FFF176', info: 'Your voice box, where your vocal cords live.' },
      { id: 'trachea', label: 'Trachea', icon: '🚰', color: '#64B5F6', info: 'The windpipe that takes air down into your chest.' },
      { id: 'bronchi', label: 'Bronchi', icon: '🌿', color: '#81C784', info: 'The two big branches off the trachea that go into your lungs.' },
      { id: 'bronchioles', label: 'Bronchioles', icon: '🍃', color: '#BA68C8', info: 'Smaller branches, like twigs on a tree inside your lungs.' },
      { id: 'alveoli', label: 'Alveoli', icon: '🍇', color: '#FF8A65', info: 'Tiny air sacs where oxygen goes into your blood.' },
      { id: 'lungs', label: 'Lungs', icon: '🫁', color: '#90CAF9', info: 'The two big, spongy organs in your chest for breathing.' },
    ]
  },
  11: {
    title: "Endocrine System",
    question: "What is the endocrine system?",
    items: [
      { id: 'glands', label: 'Glands & Organs', icon: '🏭', color: '#FFB74D', info: 'The endocrine system is a collection of glands and organs...' },
      { id: 'hormones', label: 'Hormones', icon: '✉️', color: '#E57373', info: '...that use hormones to send messages...' },
      { id: 'bloodstream', label: 'Bloodstream', icon: '🩸', color: '#FFF176', info: '...through the bloodstream...' },
      { id: 'body', label: 'To the Body', icon: '🏃', color: '#64B5F6', info: '...to the rest of the body to control growth, energy, and more!' },
    ]
  },
  12: {
    title: "Purposes of Blood",
    question: "What are the major purposes of blood?",
    items: [
      { id: 'transportation', label: 'Transportation', icon: '🚚', color: '#FFB74D', info: 'Blood carries oxygen and nutrients to every part of your body.' },
      { id: 'protection', label: 'Protection', icon: '🛡️', color: '#E57373', info: 'White blood cells in your blood protect you from sickness and germs.' },
      { id: 'communication', label: 'Communication', icon: '📱', color: '#FFF176', info: 'Blood carries hormone messages from one part of the body to another.' },
      { id: 'temperature', label: 'Temperature', icon: '🌡️', color: '#64B5F6', info: 'Blood flow helps keep your body at the perfect, warm temperature.' },
    ]
  }
};

export default function AnatomyGenericScreen({ navigation, routeParams }: any) {
  const week = routeParams?.week || 3;
  const data = ANATOMY_DATA[week];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Initialize placed state mapped to each item's id
  const [placed, setPlaced] = useState<Record<string, string | null>>(() => {
    const init: any = {};
    if (data?.items) {
      data.items.forEach((item: any) => init[item.id] = null);
    }
    return init;
  });
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const shuffledItems = useMemo(() => {
    return data?.items ? [...data.items].sort(() => Math.random() - 0.5) : [];
  }, [week]);

  const availableItems = shuffledItems.filter(item => !Object.values(placed).includes(item.id));
  const isComplete = Object.values(placed).every(v => v !== null) && data?.items?.length > 0;

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', marginTop: 100, textAlign: 'center'}}>Content for Week {week} not found.</Text>
      </View>
    );
  }

  const handleSlotTap = (slotId: string) => {
    if (selectedItem) {
      if (slotId === selectedItem) {
        setPlaced(prev => ({ ...prev, [slotId]: selectedItem }));
      }
      setSelectedItem(null);
    } else if (placed[slotId]) {
      setPlaced(prev => ({ ...prev, [slotId]: null }));
    }
  };

  const getNextWeekAction = () => {
    if (week < 12) {
      navigation.navigate('AnatomyWeek', { week: week + 1 });
    } else {
      navigation.navigate('AnatomyHub');
    }
  };

  return (
    <ImageBackground source={{ uri: BG_URL }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <TouchableOpacity 
        style={[styles.closeButton, isPlaying && { backgroundColor: 'rgba(79, 195, 247, 0.2)', paddingHorizontal: 15 }]} 
        onPress={() => isPlaying ? setIsPlaying(false) : navigation.navigate('AnatomyHub')}
      >
        <Text style={styles.closeText}>{isPlaying ? '← Back to Lesson' : '✕'}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.weekText}>WEEK {week}</Text>
        <Text style={styles.questionText}>{data.question}</Text>
      </View>

      {!isPlaying ? (
        <View style={styles.lessonArea}>
          <ScrollView contentContainerStyle={styles.accordionContainer}>
            {data.items.map((item: any) => {
              const isExpanded = expandedId === item.id;
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.accordionHeader, { borderLeftColor: item.color }]} 
                  onPress={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <View style={styles.accordionTitleRow}>
                    <Text style={styles.accordionEmoji}>{item.icon}</Text>
                    <Text style={styles.accordionTitle}>{item.label}</Text>
                    <Text style={styles.accordionIcon}>{isExpanded ? '▼' : '▶'}</Text>
                  </View>
                  {isExpanded && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.accordionText}>{item.info}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={styles.playButtonWrapper}>
            <TouchableOpacity style={styles.playButton} onPress={() => setIsPlaying(true)}>
              <Text style={styles.playButtonText}>Play Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.gameArea}>
            <ScrollView contentContainerStyle={styles.slotsContainer}>
              {data.items.map((item: any) => {
                const isPlaced = placed[item.id] === item.id;
                return (
                  <View key={`slot-${item.id}`} style={styles.slotRow}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.slotIcon}>{item.icon}</Text>
                    </View>
                    <TouchableOpacity 
                      style={[styles.dropZone, isPlaced && { borderColor: item.color, backgroundColor: 'rgba(255,255,255,0.1)' }]} 
                      onPress={() => handleSlotTap(item.id)}
                    >
                      {isPlaced ? (
                        <Text style={[styles.placedText, { color: item.color }]}>{item.label}</Text>
                      ) : (
                        <Text style={styles.dropZoneHint}>Tap to place match</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {!isComplete ? (
            <View style={styles.tray}>
              <Text style={styles.trayTitle}>Select a label below, then tap its matching slot above!</Text>
              <View style={styles.labelBank}>
                {availableItems.map(item => (
                  <TouchableOpacity 
                    key={`label-${item.id}`} 
                    style={[
                      styles.labelBadge, 
                      selectedItem === item.id && styles.selectedLabelBadge,
                      { backgroundColor: item.color }
                    ]}
                    onPress={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                  >
                    <Text style={styles.labelText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.successTray}>
              <Text style={styles.successTitle}>Outstanding!</Text>
              <Text style={styles.successText}>You've matched everything correctly!</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]} onPress={() => navigation.navigate('AnatomyHub')}>
                  <Text style={[styles.nextButtonText, { color: '#fff' }]}>Back to Hub</Text>
                </TouchableOpacity>
                {week < 12 && (
                  <TouchableOpacity style={styles.nextButton} onPress={getNextWeekAction}>
                    <Text style={styles.nextButtonText}>Next Week →</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </>
      )}

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10, 20, 30, 0.85)' },
  closeButton: { position: 'absolute', top: 40, right: 20, zIndex: 10, padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20 },
  closeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  header: { padding: 30, paddingTop: 60, alignItems: 'center' },
  weekText: { color: '#FF5252', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 5 },
  questionText: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20 },
  
  lessonArea: { flex: 1, padding: 20, maxWidth: 600, width: '100%', alignSelf: 'center' },
  accordionContainer: { paddingBottom: 20 },
  accordionHeader: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 10, padding: 20, borderLeftWidth: 4, overflow: 'hidden' },
  accordionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  accordionEmoji: { fontSize: 24, marginRight: 15 },
  accordionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', flex: 1 },
  accordionIcon: { color: '#A0A0B0', fontSize: 16 },
  accordionContent: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  accordionText: { color: '#ddd', fontSize: 16, lineHeight: 24 },
  
  playButtonWrapper: { alignItems: 'center', paddingVertical: 20 },
  playButton: { backgroundColor: '#4FC3F7', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, elevation: 5 },
  playButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },

  gameArea: { flex: 1, alignSelf: 'center', width: '100%', maxWidth: 600 },
  slotsContainer: { padding: 20, paddingBottom: 40 },
  slotRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  slotIcon: { fontSize: 32 },
  dropZone: { flex: 1, height: 60, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'dashed', borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  dropZoneHint: { color: 'rgba(255,255,255,0.4)' },
  placedText: { fontSize: 20, fontWeight: 'bold' },

  tray: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  trayTitle: { color: '#fff', fontSize: 18, marginBottom: 20, textAlign: 'center' },
  labelBank: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  labelBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, opacity: 0.8 },
  selectedLabelBadge: { opacity: 1, transform: [{ scale: 1.1 }], borderWidth: 2, borderColor: '#fff' },
  labelText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  successTray: { backgroundColor: 'rgba(76, 175, 80, 0.9)', padding: 40, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  successTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', gap: 15, justifyContent: 'center' },
  nextButton: { backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
  nextButtonText: { color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }
});
