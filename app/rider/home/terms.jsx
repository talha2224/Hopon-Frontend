import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Terms = () => {
  const navigation = useNavigation();
  const [agreed, setAgreed] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.sectionTitle}>General Disclaimers:</Text>
        <Text style={styles.paragraph}>
          1. Third-Party Services: “Uber is a technology platform that connects
          riders with independent third-party providers. Uber does not own
          vehicles or employ drivers.”
        </Text>
        <Text style={styles.paragraph}>
          2. Availability: “Service availability may vary based on location, time,
          and demand. Uber does not guarantee that a ride will be available at
          any given time.”
        </Text>
        <Text style={styles.paragraph}>
          3. Fare Estimates: “Fare estimates provided are not guaranteed and may
          vary due to factors such as traffic, route changes, or dynamic pricing
          (surge).”
        </Text>
        <Text style={styles.paragraph}>
          4. Surge Pricing Disclaimer: “Fares may increase when demand is high.
          This is known as surge pricing and is clearly shown before you confirm
          a trip.”
        </Text>
        <Text style={styles.paragraph}>
          5. Safety Disclaimer: “Uber takes steps to ensure safety, but cannot
          guarantee the actions of third-party drivers or riders.”
        </Text>
        <Text style={styles.paragraph}>
          6. Promotions and Offers: “Promotions are subject to change, may be
          limited in scope, and may not be combined with other offers.”
        </Text>
        <Text style={styles.paragraph}>
          7. Ride Cancellations: “Cancellation fees may apply if a ride is
          canceled after a certain period of time or after a driver has already
          been assigned.”
        </Text>
        <Text style={styles.paragraph}>
          8. User Responsibility: “Users are responsible for ensuring they enter
          the correct pickup and dropoff locations.”
        </Text>
        <Text style={styles.paragraph}>
          9. Payment Disclaimer: “All payments are processed through Uber’s
          secure system. Prices may be subject to local taxes and fees.”
        </Text>

        <Text style={styles.sectionTitle}>Rideshare Company Disclaimer</Text>
        <Text style={styles.paragraph}>
          10. Independent Contractor Status All drivers on our platform are
          independent contractors and are not employees, agents, or
          representatives of [hopon]. We do not control or supervise drivers’
          actions and are not liable for their conduct.
        </Text>
        <Text style={styles.paragraph}>
          11. No Guarantee of Safety While we strive to create a safe
          environment, we do not guarantee the safety of rides. Riders and
          drivers assume all risks associated with rideshare interactions.
        </Text>
        <Text style={styles.paragraph}>
          12. Limitation of Liability [hopon] is not responsible for any
          personal injury, property damage, lost items, or other damages arising
          from the use of our platform or services, including but not limited to
          incidents during rides.
        </Text>
        <Text style={styles.paragraph}>
          13. Third-Party Services Our platform facilitates connections between
          riders and drivers. We are not a transportation provider and do not
          offer ride services ourselves. All rides are provided by third-party
          drivers.
        </Text>
        <Text style={styles.paragraph}>
          14. Use at Your Own Risk By using the platform, you agree to assume
          all risks related to the use of rideshare services, including, but not
          limited to, accidents, delays, and interactions with drivers or
          riders.
        </Text>
        <Text style={styles.paragraph}>
          15. Arbitration and Waiver of Class Action All disputes must be
          resolved through binding arbitration. You waive your right to
          participate in class actions or jury trials.
        </Text>
        <Text style={styles.paragraph}>
          16. Insurance Disclaimer Drivers are required to carry their own
          insurance. [hopon] does not provide coverage for rides unless
          otherwise stated, and is not liable for any insurance claims or
          denials.
        </Text>
        <Text style={styles.paragraph}>
          17. No Warranty Our services are provided “as is” and “as available”
          without warranties of any kind, express or implied.
        </Text>
        <Text style={styles.paragraph}>
          18. Zero Tolerance Policy: Our company maintains a strict
          zero-tolerance policy for sexual misconduct, harassment, or any form of
          inappropriate behavior. Any violation will result in permanent
          suspension and may be reported to law enforcement.
        </Text>
        <Text style={styles.paragraph}>
          19. Driver & Rider Accountability: All riders and drivers are
          independent parties and are solely responsible for their own conduct.
          [hopon] does not employ drivers and is not liable for their actions.
        </Text>
        <Text style={styles.paragraph}>
          20. Background Checks & Monitoring: While we may conduct background
          checks and implement safety measures, we cannot guarantee the character
          or intentions of any user. Riders and drivers should always use
          personal judgment and remain alert during rides.
        </Text>
        <Text style={styles.paragraph}>
          21. Kidnapping & Safety Risk Disclaimer: Although rare, crimes such as
          kidnapping or unlawful restraint can occur. Users are urged to share
          ride details with a trusted contact, verify vehicle and driver
          information before entering, and use the in-app safety tools at all
          times.
        </Text>
        <Text style={styles.paragraph}>
          22. Limitation of Liability: [hopon] is not liable for any harm,
          injury, or damages resulting from misconduct, assault, abduction, or
          any criminal activity involving independent drivers or third parties.
        </Text>
        <Text style={styles.paragraph}>
          23. Emergency Protocol: In case of an emergency, users should call 911
          immediately and report the incident through the app as soon as it is
          safe to do so.
        </Text>
        <Text style={styles.paragraph}>
          By continuing to use our services, you confirm that you understand and
          accept these risks and disclaimers.
        </Text>

        <Text style={styles.sectionTitle}>
          HopOn Disclaimer – Vehicle Mess & Damage
        </Text>
        <Text style={styles.paragraph}>
          HopOn is a platform that connects riders and drivers. By using our
          service, all users agree to the following terms regarding messes and
          damage:
        </Text>
        <Text style={styles.paragraph}>
          24. HopOn is Not Responsible for Vomit or Messes If a rider vomits or
          makes a mess in a vehicle, HopOn is not liable for the cleanup or any
          resulting damage.
        </Text>
        <Text style={styles.paragraph}>
          25. Riders Are Financially Responsible Any mess, including vomit,
          spills, or bodily fluids, may result in a cleanup fee charged directly
          to the rider by the driver.
        </Text>
        <Text style={styles.paragraph}>
          26. Drivers Handle Damage Claims All claims related to interior or
          exterior damage caused during a trip are handled between the driver and
          rider. HopOn only facilitates the platform.
        </Text>
        <Text style={styles.paragraph}>
          27. No Liability for Personal Belongings HopOn is not responsible for
          damage to or loss of personal items during a trip.
        </Text>
        <Text style={styles.paragraph}>
          28. Smoking, Food, and Open Containers Riders may be charged
          additional fees or removed from the platform for violating policies
          related to smoking, food, or alcohol inside vehicles.
        </Text>
        <Text style={styles.paragraph}>
          29. Driver Vehicle Condition Not Guaranteed While HopOn encourages
          cleanliness, we do not guarantee the condition or hygiene of any
          vehicle on the platform.
        </Text>
        <Text style={styles.paragraph}>
          30. Use at Your Own Risk Riders and drivers use HopOn at their own
          risk and accept responsibility for their actions and their
          consequences during a ride.
        </Text>
        <Text style={styles.paragraph}>
          31. Disputes Handled Case-by-Case Any disputes involving fees for
          messes or damage will be reviewed, but HopOn has the final say and
          reserves the right to enforce charges.
        </Text>

        <Text style={styles.sectionTitle}>
          HopOn Fee Disclaimer – Charges Only When in Use
        </Text>
        <Text style={styles.paragraph}>
          HopOn is committed to transparency. By using our services, drivers and
          riders agree to the following:
        </Text>
        <Text style={styles.paragraph}>
          1. No Subscription or Hidden Fees HopOn does not charge monthly or
          membership fees. You are only charged when actively using the service.
        </Text>
        <Text style={styles.paragraph}>
          2. Pay-as-You-Go Model Riders are only charged for completed trips.
          There are no charges for opening the app or browsing ride options.
        </Text>
        <Text style={styles.paragraph}>
          3. Driver Commissions Only Per Ride Drivers pay a small service fee or
          commission only when they complete a paid ride. No fee is charged for
          being listed on the platform.
        </Text>
        <Text style={styles.paragraph}>
          4. No Idle Time Charges Drivers and riders will not be billed for time
          spent waiting for a ride, unless otherwise specified in surge or
          cancellation policies.
        </Text>
        <Text style={styles.paragraph}>
          5. Transparent Fare Breakdown All trip-related fees are displayed
          in-app before booking. You’ll never be surprised with unexpected
          charges.
        </Text>
        <Text style={styles.paragraph}>
          6. Cancellation or Cleaning Fees Are Exceptions Fees may apply in
          special situations like last-minute cancellations or mess/damage claims
          — these will be clearly disclosed.
        </Text>
        <Text style={styles.paragraph}>
          7. No Data Usage or Platform Access Fees HopOn does not charge for
          accessing the app or using its features like GPS, support chat, or ride
          history.
        </Text>
        <Text style={styles.paragraph}>
          8. Use of Platform = Agreement to Fee Terms By completing a ride
          (driver or rider), you agree to the fee structure as outlined at the
          time of booking.
        </Text>

        <Text style={styles.agreementText}>
          By continuing to use our services, you confirm that you understand and
          accept these risks and disclaimers.
        </Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreed(!agreed)}
          >
            {agreed && <AntDesign name="check" size={20} color="black" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f4f4f4',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  agreementText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Terms;